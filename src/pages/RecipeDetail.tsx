
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetailComponent from '../components/RecipeDetail';
import { getRecipeById, Recipe, sampleRecipes } from '../utils/recipeData';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../context/AuthContext';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = getRecipeById(id || '');
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { user, isAuthenticated } = useAuth();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if the recipe is saved for the current user
    const checkIfSaved = async () => {
      if (isAuthenticated && user && id) {
        try {
          const { data, error } = await supabase
            .from('saved_recipes')
            .select('*')
            .eq('user_id', user.id)
            .eq('recipe_id', id);
          
          if (!error && data && data.length > 0) {
            setIsSaved(true);
          }
        } catch (error) {
          console.error('Error checking saved status:', error);
        }
      }
    };
    
    checkIfSaved();
  }, [id, isAuthenticated, user]);

  // Show related recipes (for a real app, this would use a more sophisticated algorithm)
  const relatedRecipes = sampleRecipes
    .filter(r => 
      r.id !== id && 
      r.category.some(cat => recipe?.category.includes(cat))
    )
    .slice(0, 3);

  const handleSaveRecipe = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save recipes",
        variant: "destructive"
      });
      return;
    }

    if (!recipe || !id || !user) return;

    try {
      if (isSaved) {
        // Remove from saved recipes
        const { error } = await supabase
          .from('saved_recipes')
          .delete()
          .eq('user_id', user.id)
          .eq('recipe_id', id);
        
        if (error) throw error;
        
        setIsSaved(false);
        toast({
          title: "Recipe Removed",
          description: "Recipe removed from your saved collection",
        });
      } else {
        // Add to saved recipes
        const { error } = await supabase
          .from('saved_recipes')
          .insert([
            { user_id: user.id, recipe_id: id }
          ]);
        
        if (error) throw error;
        
        setIsSaved(true);
        toast({
          title: "Recipe Saved",
          description: "Recipe added to your saved collection",
        });
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast({
        title: "Error",
        description: "Failed to update your saved recipes",
        variant: "destructive"
      });
    }
  };

  if (!recipe) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-medium mb-4">Recipe not found</h2>
        <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-recipe-green text-white rounded-md hover:bg-recipe-lightGreen transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-recipe-green mb-6"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
      
      {/* Recipe Detail */}
      <RecipeDetailComponent recipe={recipe} isSaved={isSaved} onSaveToggle={handleSaveRecipe} />
      
      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRecipes.map(relatedRecipe => (
              <div 
                key={relatedRecipe.id}
                onClick={() => navigate(`/recipe/${relatedRecipe.id}`)}
                className="cursor-pointer recipe-card"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedRecipe.imageUrl} 
                      alt={relatedRecipe.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex gap-2 mb-2">
                      {relatedRecipe.category.slice(0, 1).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-recipe-cream text-recipe-orange px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{relatedRecipe.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{relatedRecipe.description}</p>
                    <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
                      <span>{relatedRecipe.prepTime + relatedRecipe.cookTime} min</span>
                      <span>{relatedRecipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
