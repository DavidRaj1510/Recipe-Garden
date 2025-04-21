interface AIResponse {
  message: string;
  suggestions?: string[];
}

interface DietRecommendation {
  dailyCalories: number;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  recommendations: string[];
  mealPlan?: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
}

export async function getAISubstitutions(ingredients: string[], dietaryRestriction?: string): Promise<AIResponse> {
  // This would normally call an AI API like OpenAI or Google Gemini
  // For now, we'll simulate a response based on common substitutions
  
  console.log(`Getting substitutions for dietary restriction: ${dietaryRestriction}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (dietaryRestriction === 'vegan') {
        resolve({
          message: "Here are some vegan substitutions for your recipe:",
          suggestions: [
            "Replace eggs with flax eggs (1 tbsp ground flaxseed + 3 tbsp water)",
            "Use maple syrup instead of honey",
            "Substitute dairy milk with almond or oat milk",
            "Replace butter with coconut oil or vegan butter",
            "Use nutritional yeast instead of parmesan cheese",
            "Substitute meat with tempeh, tofu, or seitan",
            "Replace beef stock with vegetable stock"
          ]
        });
      } else if (dietaryRestriction === 'gluten-free') {
        resolve({
          message: "Here are some gluten-free substitutions for your recipe:",
          suggestions: [
            "Use almond flour or rice flour instead of wheat flour",
            "Replace regular pasta with brown rice or chickpea pasta",
            "Use tamari instead of soy sauce",
            "Substitute couscous with quinoa",
            "Replace bread crumbs with crushed gluten-free crackers or cornmeal",
            "Use oat flour (certified gluten-free) instead of all-purpose flour",
            "Replace barley with millet or buckwheat"
          ]
        });
      } else {
        resolve({
          message: "Here are some healthier substitutions to try:",
          suggestions: [
            "Use Greek yogurt instead of sour cream for a protein boost",
            "Try olive oil instead of butter for heart-healthy fats",
            "Replace white rice with brown rice or cauliflower rice",
            "Use honey or maple syrup instead of refined sugar",
            "Substitute half the all-purpose flour with whole wheat flour",
            "Use applesauce instead of oil in baking",
            "Replace half the ground beef with lentils for added fiber"
          ]
        });
      }
    }, 1000);
  });
}

export async function getIngredientSuggestions(voiceTranscript: string): Promise<string[]> {
  // This would normally process the transcript with an AI API
  // For now we'll simulate a response
  
  console.log(`Processing food request: ${voiceTranscript}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic keyword matching for demo purposes
      const normalizedInput = voiceTranscript.toLowerCase();
      
      if (normalizedInput.includes('pasta') || normalizedInput.includes('carbonara')) {
        resolve([
          "200g spaghetti or fettuccine",
          "100g pancetta or guanciale, diced",
          "2 large eggs",
          "1 egg yolk",
          "50g Pecorino Romano cheese, grated",
          "50g Parmesan cheese, grated",
          "Freshly ground black pepper",
          "Salt for pasta water"
        ]);
      } else if (normalizedInput.includes('smoothie')) {
        resolve([
          "1 banana",
          "1 cup frozen berries",
          "1 scoop protein powder",
          "1 cup almond milk",
          "1 tbsp chia seeds",
          "1 tbsp honey or maple syrup (optional)"
        ]);
      } else if (normalizedInput.includes('salad')) {
        resolve([
          "Mixed greens or lettuce",
          "Cherry tomatoes, halved",
          "Cucumber, sliced",
          "1/4 red onion, thinly sliced",
          "Avocado, diced",
          "Your protein of choice (chicken, tofu, chickpeas)",
          "Olive oil and vinegar dressing"
        ]);
      } else if (normalizedInput.includes('biryani')) {
        resolve([
          "2 cups basmati rice, soaked for 30 minutes",
          "1.5 pounds chicken pieces (or vegetables for veg version)",
          "2 onions, thinly sliced",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "2 green chilies, slit",
          "1/2 cup yogurt",
          "1 tbsp biryani masala",
          "1/2 tsp turmeric powder",
          "1 tsp red chili powder",
          "Fresh mint and coriander leaves",
          "3 tbsp ghee",
          "2 bay leaves, 4 cloves, 1 cinnamon stick, 2 cardamoms",
          "Saffron soaked in milk"
        ]);
      } else if (normalizedInput.includes('butter chicken') || normalizedInput.includes('murgh makhani')) {
        resolve([
          "500g chicken breast or thighs, cut into pieces",
          "1/4 cup yogurt for marination",
          "1 tbsp ginger-garlic paste",
          "1 tsp red chili powder",
          "2 tbsp butter",
          "1 large onion, finely chopped",
          "2 tomatoes, pureed",
          "1/4 cup heavy cream",
          "1 tsp garam masala",
          "1 tsp dried fenugreek leaves (kasuri methi)",
          "Salt to taste"
        ]);
      } else if (normalizedInput.includes('dosa') || normalizedInput.includes('idli')) {
        resolve([
          "2 cups rice",
          "1 cup urad dal (black gram)",
          "1/2 tsp fenugreek seeds",
          "Salt to taste",
          "Oil or ghee for cooking dosas",
          "For potato filling: potatoes, onions, turmeric, mustard seeds, curry leaves"
        ]);
      } else if (normalizedInput.includes('pizza') || normalizedInput.includes('pizza dough')) {
        resolve([
          "500g all-purpose flour",
          "1 tsp salt",
          "1 tsp sugar",
          "7g dry active yeast",
          "325ml warm water",
          "2 tbsp olive oil",
          "Tomato sauce",
          "Mozzarella cheese",
          "Toppings of your choice"
        ]);
      } else if (normalizedInput.includes('chocolate cake')) {
        resolve([
          "2 cups all-purpose flour",
          "2 cups sugar",
          "3/4 cup unsweetened cocoa powder",
          "2 tsp baking soda",
          "1 tsp salt",
          "2 eggs",
          "1 cup buttermilk",
          "1/2 cup vegetable oil",
          "2 tsp vanilla extract",
          "1 cup hot coffee or water",
          "For frosting: butter, cocoa powder, powdered sugar, milk, vanilla"
        ]);
      } else if (normalizedInput.includes('pancakes')) {
        resolve([
          "1 1/2 cups all-purpose flour",
          "3 1/2 tsp baking powder",
          "1 tsp salt",
          "1 tbsp white sugar",
          "1 1/4 cups milk",
          "1 egg",
          "3 tbsp butter, melted",
          "Maple syrup for serving"
        ]);
      } else if (normalizedInput.includes('bread')) {
        resolve([
          "500g bread flour",
          "7g salt",
          "7g instant yeast",
          "350ml lukewarm water",
          "Olive oil for greasing"
        ]);
      } else if (normalizedInput.includes('sushi')) {
        resolve([
          "2 cups sushi rice",
          "3 cups water",
          "1/4 cup rice vinegar",
          "2 tbsp sugar",
          "1 tsp salt",
          "Nori seaweed sheets",
          "Sushi-grade fish (salmon, tuna) or vegetables",
          "Soy sauce, wasabi, pickled ginger for serving"
        ]);
      } else if (normalizedInput.includes('tacos')) {
        resolve([
          "12 small corn or flour tortillas",
          "500g ground beef or chicken",
          "1 packet taco seasoning",
          "Shredded lettuce",
          "Diced tomatoes",
          "Shredded cheese",
          "Sour cream",
          "Guacamole or diced avocado",
          "Salsa"
        ]);
      } else if (normalizedInput.includes('risotto')) {
        resolve([
          "1 1/2 cups arborio rice",
          "1 onion, finely diced",
          "2 cloves garlic, minced",
          "1/2 cup white wine",
          "4-5 cups chicken or vegetable stock, warm",
          "2 tbsp butter",
          "1/2 cup grated parmesan cheese",
          "Salt and pepper to taste",
          "Optional: mushrooms, peas, asparagus or other vegetables"
        ]);
      } else if (normalizedInput.includes('paella')) {
        resolve([
          "2 cups short-grain rice (preferably bomba or calasparra)",
          "4 cups chicken stock",
          "Pinch of saffron threads",
          "1 onion, diced",
          "2 tomatoes, diced",
          "2 cloves garlic, minced",
          "1 red bell pepper, sliced",
          "Seafood (shrimp, mussels, calamari)",
          "Chicken pieces",
          "Chorizo sausage, sliced",
          "Frozen peas",
          "Olive oil",
          "Paprika, salt and pepper"
        ]);
      } else if (normalizedInput.includes('curry')) {
        resolve([
          "500g protein of choice (chicken, beef, lamb, or tofu)",
          "2 tbsp curry paste or curry powder",
          "1 onion, diced",
          "2 cloves garlic, minced",
          "1 tbsp ginger, grated",
          "1 can coconut milk",
          "2 cups vegetables (bell peppers, carrots, peas, etc)",
          "Salt to taste",
          "Fresh cilantro for garnish",
          "Rice for serving"
        ]);
      } else if (normalizedInput.includes('lasagna')) {
        resolve([
          "12 lasagna noodles",
          "500g ground beef or Italian sausage",
          "1 onion, diced",
          "3 cloves garlic, minced",
          "800g crushed tomatoes",
          "2 tbsp tomato paste",
          "2 tsp dried Italian herbs",
          "500g ricotta cheese",
          "2 eggs",
          "1/4 cup fresh parsley, chopped",
          "3 cups mozzarella cheese, shredded",
          "1 cup parmesan cheese, grated",
          "Salt and pepper to taste"
        ]);
      } else {
        resolve([
          "Please specify a type of dish you want to make",
          "For example, try saying 'I want to make pasta' or 'How do I make chocolate cake?'"
        ]);
      }
    }, 1500);
  });
}

export async function getDietRecommendations(
  weight: number, 
  height: number, 
  age: number, 
  gender: string, 
  activityLevel: string, 
  goal: string
): Promise<DietRecommendation> {
  // This would call the Gemini API in a real implementation
  console.log(`Getting diet recommendations for: weight=${weight}, height=${height}, age=${age}, gender=${gender}, activity=${activityLevel}, goal=${goal}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic BMR calculation using the Mifflin-St Jeor Equation
      let bmr = 0;
      if (gender.toLowerCase() === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      // Activity multiplier
      let activityMultiplier = 1.2; // Sedentary
      switch(activityLevel.toLowerCase()) {
        case 'light':
          activityMultiplier = 1.375;
          break;
        case 'moderate':
          activityMultiplier = 1.55;
          break;
        case 'active':
          activityMultiplier = 1.725;
          break;
        case 'very active':
          activityMultiplier = 1.9;
          break;
      }
      
      let tdee = Math.round(bmr * activityMultiplier);
      let dailyCalories = tdee;
      
      // Adjust based on goal
      switch(goal.toLowerCase()) {
        case 'lose weight':
          dailyCalories = Math.round(tdee * 0.8); // 20% deficit
          break;
        case 'gain weight':
        case 'build muscle':
          dailyCalories = Math.round(tdee * 1.1); // 10% surplus
          break;
      }
      
      let recommendations: string[] = [];
      let macros = {
        protein: '',
        carbs: '',
        fats: ''
      };
      
      let mealPlan = {
        breakfast: [''],
        lunch: [''],
        dinner: [''],
        snacks: ['']
      };
      
      // Diet plan with Indian food items
      if (goal.toLowerCase() === 'lose weight') {
        macros = {
          protein: `${Math.round(weight * 2.2)}g (${Math.round((weight * 2.2 * 4) / dailyCalories * 100)}%)`,
          carbs: `${Math.round(dailyCalories * 0.4 / 4)}g (40%)`,
          fats: `${Math.round(dailyCalories * 0.3 / 9)}g (30%)`
        };
        
        recommendations = [
          "Focus on high-volume, low-calorie foods like vegetables and lean proteins",
          "Drink water before meals to help with satiety",
          "Aim for 10,000 steps per day",
          "Include strength training 2-3 times per week",
          "Eat slowly and mindfully to recognize fullness cues"
        ];
        
        mealPlan = {
          breakfast: [
            "Ragi Dosa with mint chutney (150 cal): 1 cup ragi flour, 1/4 cup rice flour, mint chutney",
            "Moong Dal Chilla (180 cal): 1 cup yellow moong dal, chopped vegetables, coriander leaves",
            "Sprouts Poha (210 cal): 1 cup flattened rice, 1/2 cup sprouted moong, vegetables, lemon juice"
          ],
          lunch: [
            "Chickpea Spinach Bowl (270 cal): 1 cup chickpeas, 2 cups spinach, spices, 1 tsp olive oil",
            "Masoor Dal with 1/2 cup brown rice (330 cal): 1 cup masoor dal, vegetables, turmeric, cumin",
            "Vegetable Khichdi (290 cal): 1/2 cup rice, 1/2 cup moong dal, mixed vegetables, turmeric"
          ],
          dinner: [
            "Baingan Bharta with 1 jowar roti (230 cal): 1 large eggplant, onion, tomatoes, spices",
            "Palak Tofu with 1 roti (250 cal): 2 cups spinach, 100g tofu, garlic, ginger, spices",
            "Lauki Sabzi with 1 bajra roti (220 cal): 1 bottle gourd, tomatoes, spices, 1 bajra roti"
          ],
          snacks: [
            "Roasted Makhana (85 cal): 1 cup fox nuts, roasted with minimal spices",
            "Cucumber Raita (70 cal): 1/2 cup low-fat yogurt, cucumber, cumin, coriander",
            "Vegetable soup (60 cal): Mixed vegetables, pepper, minimal salt",
            "1 medium apple with 1 tsp peanut butter (120 cal)"
          ]
        };
      } else if (goal.toLowerCase() === 'gain weight' || goal.toLowerCase() === 'build muscle') {
        macros = {
          protein: `${Math.round(weight * 1.8)}g (${Math.round((weight * 1.8 * 4) / dailyCalories * 100)}%)`,
          carbs: `${Math.round(dailyCalories * 0.5 / 4)}g (50%)`,
          fats: `${Math.round(dailyCalories * 0.25 / 9)}g (25%)`
        };
        
        recommendations = [
          "Eat calorie-dense foods like nuts, nut butters, ghee, and full-fat dairy",
          "Drink calories when needed (lassi, smoothies, protein shakes)",
          "Focus on compound exercises for maximum muscle growth",
          "Aim for progressive overload in your workouts",
          "Ensure adequate rest and 7-8 hours of sleep"
        ];
        
        mealPlan = {
          breakfast: [
            "Paneer Paratha with butter (450 cal): 2 whole wheat parathas stuffed with 100g paneer, 1 tbsp butter",
            "Masala Dosa with Potato filling (380 cal): 2 dosas with generous potato filling and coconut chutney",
            "Almond Banana Smoothie with Poha (520 cal): Milk, banana, 10 almonds, 1 tbsp honey, 1 cup poha"
          ],
          lunch: [
            "Rajma Chawal with ghee (520 cal): 1 cup rajma, 1 cup rice, 1 tbsp ghee, accompanied with onions",
            "Chicken Biryani (650 cal): 1.5 cups biryani with chicken pieces, raita, and papad",
            "Chole Bhature (580 cal): 1 cup chickpea curry with 2 bhaturas and pickles"
          ],
          dinner: [
            "Butter Paneer Masala with 2 naan (620 cal): Rich gravy with 150g paneer, cream, and 2 butter naans",
            "Dal Makhani with Jeera Rice (480 cal): 1 cup creamy dal makhani, 1 cup jeera rice with ghee",
            "Egg Curry with 2 parathas (540 cal): 2 eggs in rich gravy with 2 parathas"
          ],
          snacks: [
            "Dry fruit milkshake (320 cal): Milk, mixed nuts, cardamom, saffron",
            "Peanut chikki (250 cal): Jaggery and peanut sweet bar",
            "Samosas with chutney (280 cal): 2 vegetable samosas with mint chutney",
            "Fruit bowl with honey yogurt (210 cal): Mixed fruits with honey-drizzled full-fat yogurt"
          ]
        };
      } else { // Maintain
        macros = {
          protein: `${Math.round(weight * 1.6)}g (${Math.round((weight * 1.6 * 4) / dailyCalories * 100)}%)`,
          carbs: `${Math.round(dailyCalories * 0.45 / 4)}g (45%)`,
          fats: `${Math.round(dailyCalories * 0.3 / 9)}g (30%)`
        };
        
        recommendations = [
          "Focus on whole, unprocessed foods and traditional Indian meals",
          "Balance your plate with 1/4 protein, 1/4 whole grains, and 1/2 vegetables",
          "Stay hydrated by drinking at least 2L of water daily",
          "Include a mix of cardio and resistance training",
          "Practice portion control and mindful eating"
        ];
        
        mealPlan = {
          breakfast: [
            "Idli Sambar (220 cal): 3 idlis with sambar and coconut chutney",
            "Multigrain Paratha with Curd (310 cal): 2 multigrain parathas with 1/2 cup curd",
            "Vegetable Upma with coconut chutney (270 cal): Semolina upma with vegetables and chutney"
          ],
          lunch: [
            "Vegetable Thali (420 cal): 1 roti, 1/2 cup rice, dal, vegetable curry, raita, salad",
            "Fish Curry with Rice (380 cal): 120g fish in coconut curry with 1/2 cup rice",
            "Rajma Chawal with salad (390 cal): 3/4 cup rajma, 1/2 cup rice, mixed vegetable salad"
          ],
          dinner: [
            "Roti with Mixed Vegetable Sabzi (320 cal): 2 rotis with mixed vegetable preparation",
            "Paneer Bhurji with Chapati (360 cal): 75g paneer bhurji with 2 chapatis",
            "Dal Tadka with Jeera Rice (340 cal): Yellow dal with tempering and 1/2 cup jeera rice"
          ],
          snacks: [
            "Sprout Chaat (150 cal): Mixed sprouts with onion, tomato, and spices",
            "Roasted Chana (120 cal): 1/4 cup roasted chickpeas with spices",
            "Buttermilk with herbs (80 cal): Churned yogurt with cumin and coriander",
            "Fruit bowl (100 cal): Seasonal fruits like apple, orange, pear"
          ]
        };
      }
      
      resolve({
        dailyCalories,
        macros,
        recommendations,
        mealPlan
      });
    }, 1800);
  });
}

// In a real implementation, this would connect to the Gemini API
export const initializeGeminiAPI = (apiKey: string) => {
  console.log("Initializing Gemini API with key:", apiKey);
  // In production, we would initialize the API client here
  return {
    initialized: true,
    apiKey
  };
};

export async function callOpenAI(prompt: string, context: string[] = []): Promise<any> {
  console.log(`Calling OpenAI with prompt: ${prompt}`);
  
  try {
    const { supabase } = await import('../integrations/supabase/client');
    const { data, error } = await supabase.functions.invoke('openai-chat', {
      body: { prompt, context }
    });
    
    if (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to get response from AI');
    }
    
    return data;
  } catch (error) {
    console.error('Error in callOpenAI:', error);
    throw error;
  }
}

export async function processVoiceCommand(text: string): Promise<{ type: string, response: any }> {
  console.log(`Processing voice command: ${text}`);
  
  try {
    // Try to use OpenAI first
    const openAIResponse = await callOpenAI(text);
    
    if (openAIResponse.error) {
      // Fall back to mock data if there's an error
      return mockProcessVoiceCommand(text);
    }
    
    const { message, recipeDetail } = openAIResponse;
    
    // If we have a recipe detail, return it as a recipe_detail response
    if (recipeDetail) {
      return {
        type: 'recipe_detail',
        response: {
          recipe: recipeDetail,
          message: `Here's how to make ${recipeDetail.name}`
        }
      };
    }
    
    // Determine response type based on content
    if (text.toLowerCase().includes('find') || text.toLowerCase().includes('search')) {
      const keywords = text.split(" ").filter(word => 
        word.length > 3 && 
        !['find', 'search', 'recipe', 'recipes', 'for', 'with', 'some', 'make', 'cook'].includes(word)
      );
      
      return {
        type: 'search',
        response: {
          message: message,
          keywords
        }
      };
    } else if (text.toLowerCase().includes('substitut')) {
      let dietType = 'healthier';
      if (text.toLowerCase().includes('vegan')) dietType = 'vegan';
      if (text.toLowerCase().includes('gluten')) dietType = 'gluten-free';
      
      return {
        type: 'substitution',
        response: {
          message: message,
          dietType
        }
      };
    } else if (text.toLowerCase().includes('suggestion') || 
              (text.toLowerCase().includes('what') && text.toLowerCase().includes('make'))) {
      return {
        type: 'suggestion',
        response: {
          message: message,
          suggestions: extractSuggestions(message)
        }
      };
    } else {
      // Generic response
      return {
        type: 'general',
        response: {
          message: message
        }
      };
    }
  } catch (error) {
    console.error('Error processing with OpenAI:', error);
    // Fall back to mock data if there's an error
    return mockProcessVoiceCommand(text);
  }
}

// Renamed the old function to be used as fallback
function mockProcessVoiceCommand(text: string): Promise<{ type: string, response: any }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('recipe') && (lowerText.includes('find') || lowerText.includes('search'))) {
        // Search for recipes
        const keywords = lowerText.split(" ").filter(word => 
          word.length > 3 && 
          !['find', 'search', 'recipe', 'recipes', 'for', 'with', 'some', 'make', 'cook'].includes(word)
        );
        
        resolve({
          type: 'search',
          response: {
            message: `Searching for recipes with: ${keywords.join(", ")}`,
            keywords
          }
        });
      } else if (lowerText.includes('substitut')) {
        // Get substitutions
        let dietType = 'healthier';
        if (lowerText.includes('vegan')) dietType = 'vegan';
        if (lowerText.includes('gluten')) dietType = 'gluten-free';
        
        resolve({
          type: 'substitution',
          response: {
            message: `Finding ${dietType} substitutions`,
            dietType
          }
        });
      } else if ((lowerText.includes('help') || lowerText.includes('what')) && lowerText.includes('make')) {
        // Recipe suggestions
        resolve({
          type: 'suggestion',
          response: {
            message: "Here are some Indian recipe ideas you might like",
            suggestions: [
              "Butter Chicken",
              "Chicken Biryani",
              "Paneer Butter Masala",
              "Masala Dosa",
              "Chole Bhature",
              "Rajma Chawal"
            ]
          }
        });
      } else if (lowerText.includes('how') && lowerText.includes('make')) {
        // Recipe details
        let recipeName = '';
        
        if (lowerText.includes('butter chicken')) recipeName = 'Butter Chicken';
        else if (lowerText.includes('biryani')) recipeName = 'Chicken Biryani';
        else if (lowerText.includes('paneer butter') || lowerText.includes('butter paneer')) recipeName = 'Paneer Butter Masala';
        else if (lowerText.includes('dosa')) recipeName = 'Masala Dosa';
        else if (lowerText.includes('chole')) recipeName = 'Chole Bhature';
        else if (lowerText.includes('rajma')) recipeName = 'Rajma Chawal';
        else recipeName = extractRecipeName(lowerText);
        
        if (recipeName) {
          resolve({
            type: 'recipe_detail',
            response: {
              recipe: {
                name: recipeName,
                ingredients: getIngredientsForRecipe(recipeName),
                instructions: getInstructionsForRecipe(recipeName),
                youtubeLink: getYoutubeLinkForRecipe(recipeName),
                nutritionFacts: getNutritionForRecipe(recipeName)
              },
              message: `Here's how to make ${recipeName}`
            }
          });
        } else {
          resolve({
            type: 'general',
            response: {
              message: "I'm not sure which recipe you want to make. Could you please specify the dish name?",
            }
          });
        }
      } else {
        // General response
        resolve({
          type: 'general',
          response: {
            message: "I can help you find recipes, suggest ingredient substitutions, or give you cooking tips. What would you like to do?",
          }
        });
      }
    }, 1000);
  });
}

// Helper function to extract suggestions from AI response
function extractSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  
  // Look for numbered or bulleted lists
  const lines = text.split('\n');
  for (const line of lines) {
    // Match numbered lists (1. Recipe Name) or bulleted lists (- Recipe Name or • Recipe Name)
    const match = line.match(/(?:^\d+\.|\s*-|\s*•)\s*([\w\s']+)(?:recipe)?/i);
    if (match && match[1] && match[1].trim().length > 3) {
      suggestions.push(match[1].trim());
    }
  }
  
  // If we couldn't find a list, look for recipe names in the text
  if (suggestions.length === 0) {
    const commonRecipes = [
      "Butter Chicken", "Chicken Biryani", "Paneer Tikka", "Masala Dosa", 
      "Chole Bhature", "Rajma Chawal", "Palak Paneer", "Aloo Gobi",
      "Samosa", "Tandoori Chicken", "Naan", "Roti", "Idli Sambar",
      "Malai Kofta", "Gulab Jamun", "Jalebi", "Chicken Curry"
    ];
    
    for (const recipe of commonRecipes) {
      if (text.includes(recipe)) {
        suggestions.push(recipe);
      }
    }
  }
  
  // Return up to 6 suggestions, or some defaults if none found
  return suggestions.length > 0 
    ? suggestions.slice(0, 6) 
    : ["Butter Chicken", "Chicken Biryani", "Paneer Butter Masala"];
}

function extractRecipeName(text: string): string {
  // Try to extract recipe name from "how to make [recipe]" pattern
  const matches = text.match(/how\s+(?:to|do\s+i)\s+make\s+([\w\s]+)(?:\?|$)/i);
  if (matches && matches[1]) {
    return matches[1].trim();
  }
  
  // Check for "recipe for X" pattern
  const recipeForMatches = text.match(/recipe\s+for\s+([\w\s]+)(?:\?|$)/i);
  if (recipeForMatches && recipeForMatches[1]) {
    return recipeForMatches[1].trim();
  }
  
  // Check for "ingredients for X" pattern
  const ingredientsForMatches = text.match(/ingredients\s+for\s+([\w\s]+)(?:\?|$)/i);
  if (ingredientsForMatches && ingredientsForMatches[1]) {
    return ingredientsForMatches[1].trim();
  }
  
  // Check for direct food mentions
  const foodItems = [
    "pasta carbonara", "chicken biryani", "butter chicken", "masala dosa", 
    "chocolate cake", "pizza", "risotto", "paella", "sushi", "tacos",
    "curry", "lasagna", "pancakes", "bread"
  ];
  
  const lowerText = text.toLowerCase();
  for (const food of foodItems) {
    if (lowerText.includes(food)) {
      return food.charAt(0).toUpperCase() + food.slice(1);
    }
  }
  
  return '';
}

function getIngredientsForRecipe(recipeName: string): string[] {
  const normalizedName = recipeName.toLowerCase();
  
  if (normalizedName.includes('butter chicken')) {
    return [
      "500g chicken breast or thighs, cut into pieces",
      "For Marinade: 1/4 cup yogurt, 1 tbsp ginger-garlic paste, 1 tsp red chili powder, salt",
      "2 tbsp butter + 1 tbsp oil",
      "1 large onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp turmeric powder",
      "1/2 tsp garam masala",
      "1/4 cup cream",
      "1 tsp dried fenugreek leaves (kasuri methi)",
      "Salt to taste",
      "Fresh coriander for garnishing"
    ];
  } else if (normalizedName.includes('biryani')) {
    return [
      "500g chicken, cut into pieces",
      "2 cups basmati rice, soaked for 30 minutes",
      "2 onions, thinly sliced",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic paste",
      "2 green chilies, slit",
      "1/2 cup yogurt",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "1 tbsp biryani masala",
      "1/2 tsp garam masala",
      "Few mint and coriander leaves",
      "3 tbsp ghee",
      "2 bay leaves, 4 cloves, 1 cinnamon stick, 2 cardamoms",
      "Saffron soaked in warm milk (optional)",
      "Salt to taste"
    ];
  } else if (normalizedName.includes('paneer butter') || normalizedName.includes('butter paneer')) {
    return [
      "250g paneer (cottage cheese), cubed",
      "2 onions, roughly chopped",
      "3 tomatoes, roughly chopped",
      "1 tbsp ginger-garlic paste",
      "2 tbsp butter",
      "1 tbsp oil",
      "1 tsp cumin seeds",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1/2 tsp garam masala",
      "1/2 cup cream",
      "1 tsp kasuri methi (dried fenugreek leaves)",
      "Salt to taste",
      "Fresh coriander for garnishing"
    ];
  } else if (normalizedName.includes('dosa')) {
    return [
      "For Dosa Batter: 3 cups rice, 1 cup urad dal, 1/2 tsp fenugreek seeds",
      "For Potato Filling: 4 potatoes, 1 onion, 2 green chilies, 1 tsp mustard seeds",
      "1/2 tsp turmeric powder",
      "1 sprig curry leaves",
      "2 tbsp oil",
      "Salt to taste",
      "For Coconut Chutney: 1 cup grated coconut, 2 green chilies, 1-inch ginger, salt"
    ];
  } else if (normalizedName.includes('chole')) {
    return [
      "For Chole: 2 cups chickpeas, soaked overnight and boiled",
      "2 onions, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "2 green chilies, chopped",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "1 tbsp chole masala",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "For Bhature: 2 cups all-purpose flour",
      "1/2 cup yogurt",
      "1/2 tsp baking soda",
      "2 tbsp oil",
      "Oil for deep frying"
    ];
  } else if (normalizedName.includes('rajma')) {
    return [
      "1 cup red kidney beans (rajma), soaked overnight",
      "1 onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil or ghee",
      "Salt to taste",
      "2 cups rice, cooked",
      "Fresh coriander for garnishing"
    ];
  } else if (normalizedName.includes('chocolate cake')) {
    return [
      "2 cups all-purpose flour",
      "2 cups sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 tsp baking soda",
      "1 tsp salt",
      "2 large eggs",
      "1 cup buttermilk",
      "1/2 cup vegetable oil",
      "2 tsp vanilla extract",
      "1 cup hot coffee (enhances chocolate flavor)",
      "For frosting: 1/2 cup butter, 2/3 cup cocoa powder, 3 cups powdered sugar, 1/3 cup milk, 1 tsp vanilla extract"
    ];
  } else if (normalizedName.includes('pizza')) {
    return [
      "For the dough: 500g all-purpose flour, 1 tsp salt, 1 tsp sugar, 7g active dry yeast, 325ml warm water, 2 tbsp olive oil",
      "For the sauce: 1 can (400g) crushed tomatoes, 2 cloves minced garlic, 1 tbsp olive oil, 1 tsp dried oregano, 1 tsp dried basil, salt and pepper",
      "Toppings: 200g shredded mozzarella cheese",
      "Optional toppings: pepperoni, mushrooms, bell peppers, onions, olives, fresh basil",
      "Cornmeal or flour for dusting"
    ];
  } else if (normalizedName.includes('pasta carbonara') || (normalizedName.includes('pasta') && normalizedName.includes('carbonara'))) {
    return [
      "400g spaghetti or fettuccine",
      "200g pancetta or guanciale, diced (bacon can be substituted)",
      "4 large egg yolks",
      "1 whole egg",
      "100g Pecorino Romano cheese, freshly grated",
      "100g Parmesan cheese, freshly grated",
      "Freshly ground black pepper",
      "Salt for the pasta water",
      "1 tbsp olive oil"
    ];
  }
  
  // Default ingredients if recipe not found
  return ["Please specify a recipe for ingredients"];
}

function getInstructionsForRecipe(recipeName: string): string[] {
  const normalizedName = recipeName.toLowerCase();
  
  if (normalizedName.includes('butter chicken')) {
    return [
      "Marinate chicken with yogurt, ginger-garlic paste, red chili powder, and salt for 30 minutes.",
      "Heat butter and oil in a pan. Add chicken pieces and cook until golden. Remove and keep aside.",
      "In the same pan, add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add all spice powders and salt. Mix well.",
      "Add chicken pieces and cook for 5 minutes.",
      "Add cream, kasuri methi, and mix well.",
      "Simmer for 5 minutes until gravy thickens.",
      "Garnish with fresh coriander and serve hot with naan or rice."
    ];
  } else if (normalizedName.includes('biryani')) {
    return [
      "Marinate chicken with yogurt, ginger-garlic paste, turmeric, red chili powder, and salt for 30 minutes.",
      "In a heavy-bottomed pan, heat ghee and add whole spices.",
      "Add sliced onions and sauté until golden brown.",
      "Add green chilies, chopped tomatoes, and cook until tomatoes become soft.",
      "Add marinated chicken, biryani masala, and cook until chicken is half done.",
      "In another pot, cook rice until 70% done.",
      "Layer the half-cooked rice over the chicken, sprinkle mint and coriander leaves, garam masala, and saffron milk.",
      "Cover with a tight lid and cook on low heat for 20 minutes.",
      "Mix gently before serving."
    ];
  } else if (normalizedName.includes('paneer butter') || normalizedName.includes('butter paneer')) {
    return [
      "Heat oil in a pan, add cumin seeds. Let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chopped tomatoes, red chili powder, coriander powder, and salt. Cook until tomatoes are soft.",
      "Let it cool and blend into a smooth paste.",
      "In the same pan, heat butter, add the onion-tomato paste.",
      "Add 1/2 cup water and simmer for 10 minutes.",
      "Add paneer cubes, cream, garam masala, and kasuri methi.",
      "Cook for another 5 minutes on low heat.",
      "Garnish with fresh coriander and serve hot with naan or rice."
    ];
  } else if (normalizedName.includes('dosa')) {
    return [
      "Soak rice, urad dal, and fenugreek seeds separately for 4-6 hours.",
      "Grind them to a smooth batter and ferment overnight.",
      "For potato filling, boil and mash potatoes.",
      "Heat oil, add mustard seeds, curry leaves, chopped onions, green chilies, and turmeric powder.",
      "Add mashed potatoes and salt, mix well.",
      "Spread the dosa batter on a hot tawa in a circular motion.",
      "Drizzle oil around the edges, cook until golden and crisp.",
      "Place potato filling in the center, fold and serve with coconut chutney."
    ];
  } else if (normalizedName.includes('chole')) {
    return [
      "For Chole: Heat oil in a pan, add cumin seeds. Let them splutter.",
      "Add chopped onions, sauté until golden brown.",
      "Add ginger-garlic paste, green chilies, and cook for 2 minutes.",
      "Add tomato puree, turmeric, red chili powder, chole masala, and salt. Cook until oil separates.",
      "Add boiled chickpeas with water and simmer for 15-20 minutes.",
      "Add garam masala and mix well.",
      "For Bhature: Mix flour, yogurt, baking soda, oil, and salt. Knead into a soft dough.",
      "Cover and let it rest for 2-3 hours.",
      "Divide into small balls, roll into oval shapes.",
      "Deep fry until golden and puffy.",
      "Serve hot chole with bhature."
    ];
  } else if (normalizedName.includes('rajma')) {
    return [
      "Pressure cook the soaked rajma with salt until soft (about 4-5 whistles).",
      "In a pan, heat oil and add cumin seeds. Let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste, green chilies, and cook for 2 minutes.",
      "Add tomato puree, turmeric, red chili powder, rajma curry powder, and salt. Mix well.",
      "Add cooked rajma with its water and simmer for 15 minutes.",
      "Add garam masala and mix well.",
      "Garnish with fresh coriander and serve hot with steamed rice."
    ];
  } else if (normalizedName.includes('chocolate cake')) {
    return [
      "Preheat oven to 350°F (175°C). Grease and flour a 9x5 inch loaf pan.",
      "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, and salt.",
      "In a separate bowl, whisk together eggs, buttermilk, vegetable oil, and vanilla extract.",
      "Add wet ingredients to dry ingredients and mix until just combined.",
      "Bake for 55-60 minutes or until a toothpick inserted into the center comes out clean.",
      "Let cool in pan for 10 minutes, then remove and cool completely on a wire rack."
    ];
  } else if (normalizedName.includes('pizza')) {
    return [
      "Preheat oven to 450°F (230°C).",
      "In a large bowl, combine flour, salt, sugar, yeast, warm water, and olive oil.",
      "Knead dough until smooth and elastic.",
      "Let rise in a warm place for 1 hour or until doubled in size.",
      "Preheat a pizza stone or baking sheet in the oven.",
      "Roll out dough to desired thickness and place on pizza stone or baking sheet.",
      "Spread tomato sauce evenly over the dough.",
      "Add toppings of your choice.",
      "Bake for 12-15 minutes or until crust is golden brown and cheese is melted.",
      "Let cool on a wire rack."
    ];
  } else if (normalizedName.includes('pasta carbonara') || (normalizedName.includes('pasta') && normalizedName.includes('carbonara'))) {
    return [
      "Cook spaghetti or fettuccine according to package instructions.",
      "In a large skillet, heat butter and oil.",
      "Add pancetta or guanciale and cook until browned.",
      "Add egg yolks and whole egg, stirring constantly.",
      "Add Pecorino Romano and Parmesan cheese, stirring until melted.",
      "Stir in cooked pasta and serve hot."
    ];
  }
  
  // Default instructions if recipe not found
  return ["Please specify a recipe for instructions"];
}

function getYoutubeLinkForRecipe(recipeName: string): string {
  const normalizedName = recipeName.toLowerCase();
  
  if (normalizedName.includes('butter chicken')) {
    return 'https://www.youtube.com/watch?v=a30BLUQiFoc';
  } else if (normalizedName.includes('biryani')) {
    return 'https://www.youtube.com/watch?v=8KGXSjtS5pk';
  } else if (normalizedName.includes('paneer butter') || normalizedName.includes('butter paneer')) {
    return 'https://www.youtube.com/watch?v=a30BLUQiFoc';
  } else if (normalizedName.includes('dosa')) {
    return 'https://www.youtube.com/watch?v=CCab5oh0ZOc';
  } else if (normalizedName.includes('chole')) {
    return 'https://www.youtube.com/watch?v=Tzj-kLjR4-4';
  } else if (normalizedName.includes('rajma')) {
    return 'https://www.youtube.com/watch?v=FG6EOJQpAK8';
  } else if (normalizedName.includes('chocolate cake')) {
    return 'https://www.youtube.com/watch?v=123456789';
  } else if (normalizedName.includes('pizza')) {
    return 'https://www.youtube.com/watch?v=987654321';
  } else if (normalizedName.includes('pasta carbonara') || (normalizedName.includes('pasta') && normalizedName.includes('carbonara'))) {
    return 'https://www.youtube.com/watch?v=111111111';
  }
  
  return '';
}

function getNutritionForRecipe(recipeName: string): { calories: number, protein: number, carbs: number, fat: number } {
  const normalizedName = recipeName.toLowerCase();
  
  if (normalizedName.includes('butter chicken')) {
    return {
      calories: 420,
      protein: 30,
      carbs: 10,
      fat: 28
    };
  } else if (normalizedName.includes('biryani')) {
    return {
      calories: 420,
      protein: 22,
      carbs: 48,
      fat: 16
    };
  } else if (normalizedName.includes('paneer butter') || normalizedName.includes('butter paneer')) {
    return {
      calories: 360,
      protein: 14,
      carbs: 18,
      fat: 26
    };
  } else if (normalizedName.includes('dosa')) {
    return {
      calories: 230,
      protein: 5,
      carbs: 42,
      fat: 6
    };
  } else if (normalizedName.includes('chole')) {
    return {
      calories: 480,
      protein: 14,
      carbs: 68,
      fat: 18
    };
  } else if (normalizedName.includes('rajma')) {
    return {
      calories: 340,
      protein: 12,
      carbs: 58,
      fat: 8
    };
  } else if (normalizedName.includes('chocolate cake')) {
    return {
      calories: 450,
      protein: 20,
      carbs: 100,
      fat: 25
    };
  } else if (normalizedName.includes('pizza')) {
    return {
      calories: 400,
      protein: 25,
      carbs: 100,
      fat: 20
    };
  } else if (normalizedName.includes('pasta carbonara') || (normalizedName.includes('pasta') && normalizedName.includes('carbonara'))) {
    return {
      calories: 300,
      protein: 20,
      carbs: 50,
      fat: 15
    };
  }
  
  return {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };
}
