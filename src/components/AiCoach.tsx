import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, MicOff, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../context/AuthContext';

const AiCoach: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setPrompt(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again or use text input.`,
          variant: "destructive"
        });
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (speechSynthesis && speechSynthesisRef.current) speechSynthesis.cancel();
    };
  }, [toast]);

  const speakRecipe = (recipeToSpeak: any) => {
    if (!speechSynthesis) return;

    speechSynthesis.cancel();

    let speechText = `Here's the recipe for ${recipeToSpeak.title}. `;
    speechText += "You'll need the following ingredients: ";
    recipeToSpeak.ingredients.slice(0, 5).forEach((ingredient: string, index: number) => {
      speechText += `${ingredient}${index < Math.min(4, recipeToSpeak.ingredients.length - 1) ? ", " : ". "}`;
    });
    if (recipeToSpeak.ingredients.length > 5) speechText += "And several more ingredients. ";

    speechText += "Here are the main steps: ";
    recipeToSpeak.instructions.slice(0, 3).forEach((instruction: string, index: number) => {
      speechText += `Step ${index + 1}: ${instruction} `;
    });
    if (recipeToSpeak.instructions.length > 3) {
      speechText += "Continue with the remaining steps shown on screen. ";
    }

    speechText += "You can check out the related videos for visual guidance. Enjoy cooking!";

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setPrompt('');
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Voice Activated",
        description: "Speak now to ask for recipe suggestions.",
      });
    }
  };

  const generateRecipe = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description of what you'd like to cook",
        variant: "destructive"
      });
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (speechSynthesis && speechSynthesisRef.current) {
      speechSynthesis.cancel();
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: { prompt, context: [] }
      });

      if (error || !data || data.error || !data.recipeDetail) {
        throw new Error(data?.error || error?.message || 'Failed to generate recipe');
      }

      const generatedRecipe = {
        title: data.recipeDetail.name,
        ingredients: data.recipeDetail.ingredients,
        instructions: data.recipeDetail.instructions,
        youtubeLinks: data.recipeDetail.youtubeLinks || []
      };

      setRecipe(generatedRecipe);

      toast({
        title: "Recipe Generated",
        description: `Recipe for ${data.recipeDetail.name} is ready!`
      });

      speakRecipe(generatedRecipe);
    } catch (error: any) {
      toast({
        title: "Recipe Generation Failed",
        description: error.message || "Failed to generate recipe.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to save recipes",
        variant: "destructive"
      });
      return;
    }

    if (!recipe || !user) return;

    try {
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .insert({
          title: recipe.title,
          description: 'AI Generated Recipe',
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          youtubeLink: recipe.youtubeLinks[0]?.url || null,
          category: "AI Generated",
          image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          difficulty: 'Medium',
          cooking_time: 45,
          tags: [],
          user_id: user.id
        })
        .select()
        .single();

      if (recipeError) throw recipeError;

      if (recipeData) {
        const { error: saveError } = await supabase
          .from('saved_recipes')
          .insert({
            user_id: user.id,
            recipe_id: recipeData.id
          });

        if (saveError) throw saveError;

        toast({
          title: "Recipe Saved",
          description: "Recipe has been saved to your collection"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save recipe: " + (error.message || "Unknown error"),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-recipe-green p-4 rounded-t-lg flex items-center gap-2">
        <Bot className="text-white" />
        <h2 className="text-white text-xl font-medium">AI Recipe Coach</h2>
      </div>

      {!recipe ? (
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <p className="text-gray-700 mb-8">
            Ask me about any recipe you want to make. I can suggest ingredients, guide you through the process, 
            or help with substitutions.
          </p>

          <div className="flex justify-center mb-8">
            <Button 
              className={`w-16 h-16 rounded-full ${isListening ? 'bg-red-500' : 'bg-recipe-green'}`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your recipe question here..."
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-recipe-green"
            />
            <Button 
              className="bg-recipe-green text-white" 
              onClick={generateRecipe}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : <Send size={18} />}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{recipe.title}</h2>
            {isSpeaking ? (
              <Button variant="outline" onClick={stopSpeaking}>Stop Audio</Button>
            ) : (
              <Button variant="outline" onClick={() => speakRecipe(recipe)}>Play Audio</Button>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-recipe-green">Ingredients:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-recipe-green">Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              {recipe.instructions.map((instruction: string, index: number) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-recipe-green">Video Tutorials:</h3>
            <ul className="space-y-2">
              {recipe.youtubeLinks.map((link: { title: string, url: string }, index: number) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Youtube size={20} /> {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { setRecipe(null); stopSpeaking(); }}>
              Ask Another Question
            </Button>
            <Button className="bg-recipe-green" onClick={saveRecipe}>
              Save Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiCoach;
