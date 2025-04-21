import React, { useState, useEffect } from 'react';
import { Clock, Users, Star, Bookmark, BookmarkCheck, Youtube, Printer, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '../utils/recipeData';
import { getAISubstitutions } from '../utils/aiHelpers';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../context/AuthContext';

interface RecipeDetailProps {
  recipe: Recipe;
  isSaved?: boolean;
  onSaveToggle?: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, isSaved = false, onSaveToggle }) => {
  const [showSubstitutions, setShowSubstitutions] = useState(false);
  const [substitutions, setSubstitutions] = useState<string[]>([]);
  const [dietaryRestriction, setDietaryRestriction] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const { toast } = useToast();
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    const fetchYoutubeLinks = async () => {
      try {
        const searchLinks = [
          `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.title + ' easy recipe')}`,
          `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.title + ' chef tips')}`
        ];

        if (recipe.youtubeLink) {
          searchLinks.unshift(recipe.youtubeLink);
        }

        const validLinks = searchLinks.filter(link => !!link);
        setYoutubeLinks(validLinks);
      } catch (error) {
        console.error('Error fetching YouTube links:', error);
      }
    };

    fetchYoutubeLinks();
  }, [recipe.title, recipe.youtubeLink]);
  
  const handleSubstitutionRequest = async () => {
    setIsLoading(true);
    try {
      const result = await getAISubstitutions(recipe.ingredients, dietaryRestriction);
      setSubstitutions(result.suggestions || []);
      
      toast({
        title: "AI Suggestions Ready",
        description: result.message,
      });
      
      setShowSubstitutions(true);
    } catch (error) {
      console.error('Error getting substitutions:', error);
      toast({
        title: "Error",
        description: "Failed to get ingredient substitutions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const parseIngredientQuantity = (ingredient: string) => {
    const match = ingredient.match(/^([\d/\.\s]+)/);
    if (!match) return { quantity: null, unit: null, rest: ingredient };
    
    const quantityStr = match[0].trim();
    const rest = ingredient.slice(match[0].length).trim();
    
    if (quantityStr.includes('/')) {
      const parts = quantityStr.split('/');
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return { 
            quantity: numerator / denominator,
            unit: rest.split(' ')[0],
            rest: rest.split(' ').slice(1).join(' ')
          };
        }
      }
    }
    
    if (quantityStr.includes(' ') && quantityStr.includes('/')) {
      const parts = quantityStr.split(' ');
      const whole = parseFloat(parts[0]);
      const fractionParts = parts[1].split('/');
      if (fractionParts.length === 2) {
        const numerator = parseFloat(fractionParts[0]);
        const denominator = parseFloat(fractionParts[1]);
        if (!isNaN(whole) && !isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return { 
            quantity: whole + numerator / denominator,
            unit: rest.split(' ')[0],
            rest: rest.split(' ').slice(1).join(' ')
          };
        }
      }
    }
    
    const quantity = parseFloat(quantityStr);
    if (!isNaN(quantity)) {
      return { 
        quantity,
        unit: rest.split(' ')[0],
        rest: rest.split(' ').slice(1).join(' ')
      };
    }
    
    return { quantity: null, unit: null, rest: ingredient };
  };

  const scaleIngredient = (ingredient: string, originalServings: number, newServings: number) => {
    const { quantity, unit, rest } = parseIngredientQuantity(ingredient);
    
    if (quantity === null) return ingredient;
    
    const scaleFactor = newServings / originalServings;
    const scaledQuantity = quantity * scaleFactor;
    
    let formattedQuantity;
    if (scaledQuantity < 1 && scaledQuantity > 0) {
      if (Math.abs(scaledQuantity - 0.25) < 0.01) formattedQuantity = "1/4";
      else if (Math.abs(scaledQuantity - 0.33) < 0.01) formattedQuantity = "1/3";
      else if (Math.abs(scaledQuantity - 0.5) < 0.01) formattedQuantity = "1/2";
      else if (Math.abs(scaledQuantity - 0.67) < 0.01) formattedQuantity = "2/3";
      else if (Math.abs(scaledQuantity - 0.75) < 0.01) formattedQuantity = "3/4";
      else formattedQuantity = scaledQuantity.toFixed(2);
    } else {
      const rounded = Math.round(scaledQuantity * 4) / 4;
      if (rounded === Math.floor(rounded)) {
        formattedQuantity = rounded.toString();
      } else {
        const whole = Math.floor(rounded);
        const fraction = rounded - whole;
        
        if (Math.abs(fraction - 0.25) < 0.01) {
          formattedQuantity = whole > 0 ? `${whole} 1/4` : "1/4";
        } else if (Math.abs(fraction - 0.5) < 0.01) {
          formattedQuantity = whole > 0 ? `${whole} 1/2` : "1/2";
        } else if (Math.abs(fraction - 0.75) < 0.01) {
          formattedQuantity = whole > 0 ? `${whole} 3/4` : "3/4";
        } else {
          formattedQuantity = rounded.toFixed(1);
        }
      }
    }
    
    return unit ? `${formattedQuantity} ${unit} ${rest}` : `${formattedQuantity} ${rest}`;
  };

  const incrementServings = () => {
    setServings(prev => Math.min(prev + 1, 20));
    toast({
      title: "Servings Updated",
      description: `Recipe adjusted for ${servings + 1} servings`,
    });
  };

  const decrementServings = () => {
    setServings(prev => Math.max(prev - 1, 1));
    if (servings > 1) {
      toast({
        title: "Servings Updated",
        description: `Recipe adjusted for ${servings - 1} servings`,
      });
    }
  };

  const handleSaveRecipeInternal = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save recipes",
        variant: "destructive"
      });
      return false;
    }

    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_recipes')
          .delete()
          .eq('user_id', user.id)
          .eq('recipe_id', recipe.id);
        
        if (error) {
          console.error('Error removing recipe:', error);
          throw error;
        }
        
        toast({
          title: "Recipe Removed",
          description: "Recipe removed from your saved collection",
        });
        return false;
      } else {
        const { error } = await supabase
          .from('saved_recipes')
          .insert([
            { user_id: user.id, recipe_id: recipe.id }
          ]);
        
        if (error) {
          console.error('Error saving recipe:', error);
          throw error;
        }
        
        toast({
          title: "Recipe Saved",
          description: "Recipe added to your saved collection",
        });
        return true;
      }
    } catch (error) {
      console.error('Error saving/removing recipe:', error);
      toast({
        title: "Error",
        description: "Failed to update your saved recipes. Please try again.",
        variant: "destructive"
      });
      return isSaved;
    }
  };

  const handleSaveToggle = async () => {
    const newSavedState = await handleSaveRecipeInternal();
    if (onSaveToggle) {
      onSaveToggle();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-[300px] md:h-[400px]">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{recipe.title}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.category.map(cat => (
              <span key={cat} className="px-3 py-1 text-sm bg-recipe-orange bg-opacity-90 rounded-full">{cat}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 md:gap-6 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-recipe-green" />
            <div>
              <p className="text-xs text-gray-500">Prep + Cook</p>
              <p className="font-medium">{recipe.prepTime + recipe.cookTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={20} className="text-recipe-green" />
            <div className="flex items-center">
              <p className="text-xs text-gray-500 mr-2">Servings</p>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button 
                  onClick={decrementServings} 
                  disabled={servings <= 1}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronDown size={14} />
                </button>
                <span className="px-3 font-medium">{servings}</span>
                <button 
                  onClick={incrementServings}
                  disabled={servings >= 20}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronUp size={14} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Star size={20} className="text-recipe-orange" />
            <div>
              <p className="text-xs text-gray-500">Difficulty</p>
              <p className="font-medium">{recipe.difficulty}</p>
            </div>
          </div>
          
          <div className="ml-auto flex gap-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100" 
              title={isSaved ? "Remove from Saved Recipes" : "Save Recipe"}
              onClick={handleSaveToggle}
            >
              {isSaved ? 
                <BookmarkCheck size={20} className="text-recipe-green" /> : 
                <Bookmark size={20} className="text-gray-500" />
              }
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" title="Print Recipe">
              <Printer size={20} className="text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" title="Share Recipe">
              <Share2 size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-8">{recipe.description}</p>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Need Substitutions?</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-3">
              Get AI-powered ingredient substitutions for dietary restrictions or preferences.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setDietaryRestriction('vegan')}
                className={`px-3 py-1 rounded-full text-sm ${
                  dietaryRestriction === 'vegan' 
                    ? 'bg-recipe-green text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vegan
              </button>
              <button
                onClick={() => setDietaryRestriction('gluten-free')}
                className={`px-3 py-1 rounded-full text-sm ${
                  dietaryRestriction === 'gluten-free' 
                    ? 'bg-recipe-green text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Gluten-Free
              </button>
              <button
                onClick={() => setDietaryRestriction('')}
                className={`px-3 py-1 rounded-full text-sm ${
                  dietaryRestriction === '' 
                    ? 'bg-recipe-green text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Healthier Options
              </button>
            </div>
            
            <button
              onClick={handleSubstitutionRequest}
              disabled={isLoading}
              className="w-full py-2 bg-recipe-orange hover:bg-recipe-darkOrange text-white rounded-md transition-colors duration-200 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Getting suggestions...</span>
                </div>
              ) : (
                'Get Substitution Suggestions'
              )}
            </button>
            
            {showSubstitutions && substitutions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2">Suggestions:</h4>
                <ul className="space-y-1">
                  {substitutions.map((sub, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-recipe-green">•</span>
                      <span className="text-gray-700">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-medium mb-4">Ingredients</h3>
            <p className="text-sm text-gray-500 mb-3">For {servings} {servings === 1 ? 'serving' : 'servings'}</p>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-recipe-orange text-lg">•</span>
                  <span className="text-gray-700">
                    {scaleIngredient(ingredient, recipe.servings, servings)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium mb-4">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex gap-3">
                    <span className="bg-recipe-green text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
