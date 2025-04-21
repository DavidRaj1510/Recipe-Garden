
export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string[];
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  createdBy: string;
  youtubeLink?: string;
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Healthy',
  'Workout',
  'Dessert',
  'Vegetarian',
  'Vegan',
  'Gluten-Free'
];

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Pancakes',
    description: 'Fluffy pancakes served with maple syrup and berries.',
    category: ['Breakfast'],
    ingredients: ['1 cup flour', '1 tbsp sugar', '2 tsp baking powder', '1 egg', '1 cup milk', '2 tbsp butter, melted'],
    instructions: ['Mix dry ingredients', 'Whisk egg, milk, and butter', 'Combine wet and dry ingredients', 'Cook on a griddle'],
    imageUrl: 'https://recipesblob.oetker.co.uk/assets/df6a7bf3c264495d80c24b3972738ae6/1272x764/banana-pancakes.webp',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    tags: ['Breakfast', 'Sweet'],
    createdBy: 'PancakeMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=LAHhYJddVaw',
    nutritionFacts: {
      calories: 300,
      protein: 8,
      carbs: 50,
      fat: 10
    }
  },
  {
    id: '2',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    category: ['Lunch', 'Dinner'],
    ingredients: ['8 oz spaghetti', '4 oz pancetta', '2 large eggs', '1/2 cup Parmesan cheese', 'Black pepper'],
    instructions: ['Cook spaghetti', 'Fry pancetta', 'Whisk eggs and cheese', 'Combine all ingredients'],
    imageUrl: 'https://realfood.tesco.com/media/images/1400x919-SpaghettiCarbonara-557b6ff5-c4f3-4565-ae8e-a506f7dcc415-0-1400x919.jpg',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    tags: ['Italian', 'Pasta'],
    createdBy: 'ItalianChef',
    youtubeLink: 'https://www.youtube.com/watch?v=dJzKjJnyzee',
    nutritionFacts: {
      calories: 400,
      protein: 20,
      carbs: 60,
      fat: 15
    }
  },
  {
    id: '3',
    title: 'Chicken Stir-Fry',
    description: 'Quick and easy chicken stir-fry with mixed vegetables in a savory sauce.',
    category: ['Lunch', 'Dinner'],
    ingredients: ['1 lb chicken breast', '1 bell pepper', '1 onion', '1 cup broccoli florets', '1/4 cup soy sauce', '1 tbsp cornstarch'],
    instructions: ['Cut chicken and vegetables', 'Stir-fry chicken', 'Add vegetables', 'Add sauce and simmer'],
    imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2021/05/Chicken-Stir-Fry-main.jpg',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Asian', 'Stir-Fry'],
    createdBy: 'AsianCuisine',
    youtubeLink: 'https://www.youtube.com/watch?v=J5qQjBjx0gQ',
    nutritionFacts: {
      calories: 350,
      protein: 30,
      carbs: 30,
      fat: 10
    }
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies, perfect for an afternoon treat.',
    category: ['Snacks', 'Dessert'],
    ingredients: ['2 1/4 cups flour', '1 cup butter', '3/4 cup sugar', '3/4 cup brown sugar', '2 eggs', '1 tsp vanilla', '2 cups chocolate chips'],
    instructions: ['Cream butter and sugars', 'Add eggs and vanilla', 'Mix in dry ingredients', 'Stir in chocolate chips', 'Bake'],
    imageUrl: 'https://chocolatecoveredkatie.com/wp-content/uploads/2022/10/Vegan-Chocolate-Cookies.jpg',
    prepTime: 10,
    cookTime: 12,
    servings: 24,
    difficulty: 'Easy',
    tags: ['Cookies', 'Sweet'],
    createdBy: 'CookieMonster',
    youtubeLink: 'https://www.youtube.com/watch?v=fs-N3G9c1A8',
    nutritionFacts: {
      calories: 150,
      protein: 2,
      carbs: 20,
      fat: 8
    }
  },
  {
    id: '5',
    title: 'Grilled Salmon with Asparagus',
    description: 'Healthy and delicious grilled salmon served with fresh asparagus.',
    category: ['Lunch', 'Dinner', 'Healthy'],
    ingredients: ['4 salmon fillets', '1 lb asparagus', '2 tbsp olive oil', '1 lemon', 'Salt', 'Pepper'],
    instructions: ['Marinate salmon', 'Grill salmon', 'Grill asparagus', 'Serve with lemon'],
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5690a5b325981daa98ed9b10/1460669335961-VXCF9HX2YFUJZPHUFEF4/image-asset.jpeg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Seafood', 'Healthy'],
    createdBy: 'HealthyEater',
    youtubeLink: 'https://www.youtube.com/watch?v=xMRjRz-Kl2I',
    nutritionFacts: {
      calories: 380,
      protein: 35,
      carbs: 5,
      fat: 25
    }
  },
  {
    id: '6',
    title: 'Vegetarian Chili',
    description: 'Hearty vegetarian chili with beans, vegetables, and spices.',
    category: ['Lunch', 'Dinner', 'Vegetarian'],
    ingredients: ['1 onion', '2 bell peppers', '1 can diced tomatoes', '1 can kidney beans', '1 can black beans', 'Chili powder', 'Cumin'],
    instructions: ['Sauté vegetables', 'Add beans and tomatoes', 'Simmer with spices'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    prepTime: 15,
    cookTime: 30,
    servings: 6,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Soup'],
    createdBy: 'VeggieChef',
    youtubeLink: 'https://www.youtube.com/watch?v=wbw6v3YjvvU',
    nutritionFacts: {
      calories: 250,
      protein: 15,
      carbs: 40,
      fat: 5
    }
  },
  {
    id: '7',
    title: 'Fruit Salad',
    description: 'Refreshing fruit salad with a variety of seasonal fruits.',
    category: ['Snacks', 'Healthy'],
    ingredients: ['1 cup strawberries', '1 cup blueberries', '1 cup melon', '1 cup grapes'],
    instructions: ['Cut fruits', 'Combine fruits'],
    imageUrl: 'https://www.cubesnjuliennes.com/wp-content/uploads/2022/06/Fresh-Summer-Fruit-Salad-Recipe.jpg',
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Fruit', 'Healthy'],
    createdBy: 'FruitLover',
    youtubeLink: 'https://www.youtube.com/watch?v=nn9BVmn5BS4',
    nutritionFacts: {
      calories: 100,
      protein: 1,
      carbs: 25,
      fat: 0
    }
  },
  {
    id: '8',
    title: 'Omelette',
    description: 'Quick and easy omelette with your choice of fillings.',
    category: ['Breakfast'],
    ingredients: ['2 eggs', 'Salt', 'Pepper', 'Optional fillings: cheese, vegetables, ham'],
    instructions: ['Whisk eggs', 'Cook in a pan', 'Add fillings', 'Fold and serve'],
    imageUrl: 'https://www.healthyfood.com/wp-content/uploads/2018/02/Basic-omelette.jpg',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    tags: ['Breakfast', 'Eggs'],
    createdBy: 'EggMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=okBJeqjjV7Q',
    nutritionFacts: {
      calories: 200,
      protein: 15,
      carbs: 2,
      fat: 14
    }
  },
  {
    id: '9',
    title: 'Chicken Caesar Salad',
    description: 'Classic Caesar salad with grilled chicken.',
    category: ['Lunch', 'Dinner'],
    ingredients: ['Romaine lettuce', 'Grilled chicken', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
    instructions: ['Grill chicken', 'Prepare lettuce', 'Combine ingredients', 'Add dressing'],
    imageUrl: 'https://s23209.pcdn.co/wp-content/uploads/2023/01/220905_DD_Chx-Caesar-Salad_051.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Salad', 'Chicken'],
    createdBy: 'SaladChef',
    youtubeLink: 'https://www.youtube.com/watch?v=4bFjbV8mDJk',
    nutritionFacts: {
      calories: 350,
      protein: 25,
      carbs: 15,
      fat: 20
    }
  },
  {
    id: '10',
    title: 'Banana Smoothie',
    description: 'Simple and healthy banana smoothie.',
    category: ['Breakfast', 'Snacks', 'Healthy'],
    ingredients: ['1 banana', '1 cup milk', '1 tbsp honey'],
    instructions: ['Blend all ingredients'],
    imageUrl: 'https://joyfoodsunshine.com/wp-content/uploads/2022/01/banana-smoothie-recipe-3-500x500.jpg',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ['Smoothie', 'Healthy'],
    createdBy: 'SmoothieLover',
    youtubeLink: 'https://www.youtube.com/watch?v=c5nODjJmxFg',
    nutritionFacts: {
      calories: 200,
      protein: 5,
      carbs: 40,
      fat: 2
    }
  },
  {
    id: '11',
    title: 'Beef Tacos',
    description: 'Delicious beef tacos with all the fixings.',
    category: ['Lunch', 'Dinner'],
    ingredients: ['1 lb ground beef', 'Taco shells', 'Lettuce', 'Tomato', 'Cheese', 'Taco sauce'],
    instructions: ['Cook beef', 'Prepare toppings', 'Assemble tacos'],
    imageUrl: 'https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg',
    prepTime: 15,
    cookTime: 20,
    servings: 6,
    difficulty: 'Easy',
    tags: ['Mexican', 'Tacos'],
    createdBy: 'TacoMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=meuWJqjyyhk',
    nutritionFacts: {
      calories: 320,
      protein: 22,
      carbs: 25,
      fat: 15
    }
  },
  {
    id: '12',
    title: 'Caprese Salad',
    description: 'Simple and flavorful Caprese salad with tomatoes, mozzarella, and basil.',
    category: ['Lunch', 'Snacks', 'Vegetarian'],
    ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive oil', 'Balsamic glaze'],
    instructions: ['Slice tomatoes and mozzarella', 'Arrange on a plate', 'Add basil', 'Drizzle with olive oil and balsamic glaze'],
    imageUrl: 'https://cdn.jwplayer.com/v2/media/ijz16cbA/thumbnails/tDQRSbQA.jpg',
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Salad', 'Vegetarian'],
    createdBy: 'SaladLover',
    youtubeLink: 'https://www.youtube.com/watch?v=m_HguqwyqgI',
    nutritionFacts: {
      calories: 220,
      protein: 12,
      carbs: 8,
      fat: 15
    }
  },
  {
    id: '13',
    title: 'Peanut Butter Energy Balls',
    description: 'Quick and easy energy balls with peanut butter, oats, and honey.',
    category: ['Snacks', 'Healthy', 'Workout'],
    ingredients: ['1 cup oats', '1/2 cup peanut butter', '1/4 cup honey', '1/4 cup chocolate chips'],
    instructions: ['Mix all ingredients', 'Roll into balls', 'Refrigerate'],
    imageUrl: 'https://www.ambitiouskitchen.com/wp-content/uploads/2023/03/Peanut-Butter-Energy-Bites-7.jpg',
    prepTime: 10,
    cookTime: 0,
    servings: 12,
    difficulty: 'Easy',
    tags: ['Snacks', 'Workout'],
    createdBy: 'EnergyChef',
    youtubeLink: 'https://www.youtube.com/watch?v=opSskYuQPK4',
    nutritionFacts: {
      calories: 120,
      protein: 4,
      carbs: 15,
      fat: 6
    }
  },
  {
    id: '14',
    title: 'Mushroom Risotto',
    description: 'Creamy mushroom risotto, perfect for a cozy night in.',
    category: ['Dinner', 'Vegetarian'],
    ingredients: ['1 cup Arborio rice', '4 cups vegetable broth', '1 lb mushrooms', '1/2 cup Parmesan cheese', '1/4 cup white wine'],
    instructions: ['Sauté mushrooms', 'Toast rice', 'Add broth gradually', 'Stir in cheese'],
    imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2023/01/mushroom-risotto-recipe.jpg',
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium',
    tags: ['Italian', 'Vegetarian'],
    createdBy: 'RisottoMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=VOBmI3_-vJM',
    nutritionFacts: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 16
    }
  },
  {
    id: '15',
    title: 'Lemon Herb Roasted Chicken',
    description: 'Flavorful roasted chicken with lemon and herbs.',
    category: ['Dinner'],
    ingredients: ['1 whole chicken', '1 lemon', 'Rosemary', 'Thyme', 'Olive oil', 'Salt', 'Pepper'],
    instructions: ['Prepare chicken', 'Stuff with lemon and herbs', 'Roast'],
    imageUrl: 'https://i.pinimg.com/736x/37/d2/4d/37d24df750d82de891821b7f319cde97.jpg',
    prepTime: 15,
    cookTime: 60,
    servings: 6,
    difficulty: 'Medium',
    tags: ['Chicken', 'Roast'],
    createdBy: 'RoastMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=jKsYbt4mrIE',
    nutritionFacts: {
      calories: 450,
      protein: 40,
      carbs: 5,
      fat: 30
    }
  },
  {
    id: '16',
    title: 'Avocado Toast',
    description: 'Simple and healthy avocado toast.',
    category: ['Breakfast', 'Healthy'],
    ingredients: ['Bread', 'Avocado', 'Salt', 'Pepper', 'Optional: red pepper flakes, egg'],
    instructions: ['Toast bread', 'Mash avocado', 'Spread on toast', 'Add toppings'],
    imageUrl: 'https://eightforestlane.com/wp-content/uploads/2024/01/Smashed-Avocado-Toast_WEB-6.jpg',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    tags: ['Breakfast', 'Healthy'],
    createdBy: 'AvocadoFan',
    youtubeLink: 'https://www.youtube.com/watch?v=eWnP-w8qVEQ',
    nutritionFacts: {
      calories: 250,
      protein: 7,
      carbs: 20,
      fat: 16
    }
  },
  {
    id: '17',
    title: 'Upma',
    description: 'A savory semolina breakfast dish popular in South India, perfect for a quick and filling morning meal.',
    category: ['Breakfast', 'Vegetarian', 'Indian'],
    ingredients: [
      '1 cup semolina (suji/rava)',
      '1 onion, finely chopped',
      '1 tomato, chopped',
      '1 green chili, finely chopped',
      '1 tsp mustard seeds',
      '1 tsp urad dal',
      '1 tsp chana dal',
      '1 sprig curry leaves',
      '2 tbsp oil',
      '1/4 cup green peas',
      'Fresh coriander, chopped',
      '2 cups water',
      'Salt to taste'
    ],
    instructions: [
      'Dry roast the semolina in a pan for 3-4 minutes until it gives a nutty aroma. Keep aside.',
      'Heat oil in a pan. Add mustard seeds and let them splutter.',
      'Add urad dal, chana dal and sauté until golden brown.',
      'Add green chili and curry leaves.',
      'Add onions and sauté until translucent.',
      'Add tomatoes, peas and cook for 2 minutes.',
      'Pour 2 cups of water, add salt and bring to a boil.',
      'Slowly add the roasted semolina while stirring continuously to avoid lumps.',
      'Mix well, cover and cook on low flame for 2-3 minutes until all water is absorbed.',
      'Garnish with fresh coriander and serve hot.'
    ],
    imageUrl: 'https://www.funfoodfrolic.com/wp-content/uploads/2019/06/Rava-Upma-3.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    tags: ['South Indian', 'Quick', 'Traditional'],
    createdBy: 'IndianBreakfastChef',
    youtubeLink: 'https://www.youtube.com/watch?v=uygtQ9uK2wY',
    nutritionFacts: {
      calories: 250,
      protein: 7,
      carbs: 42,
      fat: 8
    }
  },
  {
    id: '18',
    title: 'Chole Kulche',
    description: 'A popular North Indian breakfast of spicy chickpea curry served with soft, leavened bread.',
    category: ['Breakfast', 'Vegetarian', 'Indian'],
    ingredients: [
      'For Chole: 2 cups chickpeas (soaked overnight)',
      '2 onions, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 green chilies, chopped',
      '1 tsp cumin seeds',
      '1 tsp coriander powder',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '1 tsp amchur (dry mango powder)',
      'For Kulcha: 2 cups all-purpose flour',
      '1/2 tsp baking soda',
      '1/2 cup yogurt',
      '2 tbsp oil',
      '1 tsp ajwain (carom seeds)',
      'Butter for cooking'
    ],
    instructions: [
      'For Chole: Pressure cook chickpeas with salt until soft.',
      'Heat oil, add cumin seeds, and let them splutter.',
      'Add onions, sauté until golden.',
      'Add ginger-garlic paste, cook for 2 minutes.',
      'Add tomato puree, all spices, and salt. Cook until oil separates.',
      'Add boiled chickpeas with some water. Simmer for 15 minutes.',
      'For Kulcha: Mix flour, baking soda, yogurt, oil, ajwain, and salt. Knead into soft dough.',
      'Rest the dough for 2 hours.',
      'Divide into balls, roll into oval shapes.',
      'Cook on a hot tawa with butter until golden brown spots appear.',
      'Serve hot chole with kulcha.'
    ],
    imageUrl: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/51ce71db-db8e-4316-a6ff-a249466d62be/Chole-Kulche-.jpeg',
    prepTime: 30,
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    tags: ['North Indian', 'Street Food', 'Protein-Rich'],
    createdBy: 'DelhiFoodSpecialist',
    youtubeLink: 'https://www.youtube.com/watch?v=UhVXGB0sK_4',
    nutritionFacts: {
      calories: 420,
      protein: 14,
      carbs: 65,
      fat: 13
    }
  },
  {
    id: '19',
    title: 'Kadai Paneer',
    description: 'A flavorful North Indian dish of paneer cooked with bell peppers and special kadai masala.',
    category: ['Lunch', 'Dinner', 'Vegetarian', 'Indian'],
    ingredients: [
      '250g paneer, cubed',
      '2 bell peppers (mixed colors), diced',
      '2 onions, roughly chopped',
      '3 tomatoes, roughly chopped',
      '2 green chilies, slit',
      '1 inch ginger, crushed',
      '4-5 garlic cloves, crushed',
      '1 tsp cumin seeds',
      '1 tbsp coriander seeds, crushed',
      '1 tsp red chili powder',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      '2 tbsp oil',
      'Fresh cream for garnishing',
      'Fresh coriander leaves for garnishing',
      'Salt to taste'
    ],
    instructions: [
      'Heat 1 tbsp oil in a kadai/pan, add paneer cubes and fry until golden. Remove and keep aside.',
      'In the same pan, add remaining oil, cumin seeds, and crushed coriander seeds. Let them splutter.',
      'Add crushed ginger, garlic, and green chilies. Sauté for a minute.',
      'Add chopped onions and sauté until translucent.',
      'Add chopped tomatoes, turmeric, red chili powder, and salt. Cook until tomatoes are soft.',
      'Let it cool and grind to a smooth paste.',
      'Return the paste to the pan, add some water if needed.',
      'Add diced bell peppers and cook for 5 minutes.',
      'Add fried paneer cubes, garam masala, and mix gently.',
      'Simmer for 5 minutes. Garnish with fresh cream and coriander leaves.',
      'Serve hot with roti or naan.'
    ],
    imageUrl: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    tags: ['North Indian', 'Spicy', 'Restaurant Style'],
    createdBy: 'PaneerExpert',
    youtubeLink: 'https://www.youtube.com/watch?v=LLxWzKZL0lg',
    nutritionFacts: {
      calories: 340,
      protein: 14,
      carbs: 16,
      fat: 25
    }
  },
  {
    id: '20',
    title: 'Palak Rice',
    description: 'A nutritious and flavorful rice dish cooked with spinach and aromatic spices.',
    category: ['Lunch', 'Vegetarian', 'Healthy', 'Indian'],
    ingredients: [
      '2 cups basmati rice',
      '2 bunches spinach, blanched and pureed',
      '1 onion, finely chopped',
      '1 tomato, chopped',
      '1 inch ginger, grated',
      '2-3 garlic cloves, minced',
      '2 green chilies, chopped',
      '1 tsp cumin seeds',
      '1 bay leaf',
      '1 cinnamon stick',
      '2-3 cloves',
      '2-3 cardamom pods',
      '1/2 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '2 tbsp ghee or oil',
      'Fresh coriander for garnishing',
      'Salt to taste'
    ],
    instructions: [
      'Wash and soak rice for 30 minutes. Drain and keep aside.',
      'Heat ghee in a pan. Add bay leaf, cinnamon, cloves, cardamom, and cumin seeds.',
      'Add chopped onions and sauté until golden brown.',
      'Add ginger, garlic, green chilies and sauté for 2 minutes.',
      'Add chopped tomatoes, turmeric, red chili powder, and salt. Cook until tomatoes are soft.',
      'Add spinach puree and cook for 3-4 minutes.',
      'Add soaked rice and mix gently.',
      'Add 3.5 cups of water and bring to a boil.',
      'Reduce heat to low, cover and cook until rice is done (about 15 minutes).',
      'Add garam masala, fluff the rice with a fork.',
      'Garnish with fresh coriander and serve hot.'
    ],
    imageUrl: 'https://nishkitchen.com/wp-content/uploads/2022/05/Indian-Spinach-Rice-1B.jpg',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    tags: ['Healthy', 'One-Pot', 'Iron-Rich'],
    createdBy: 'NutritionChef',
    youtubeLink: 'https://www.youtube.com/watch?v=ZSe4MjzD0ZI',
    nutritionFacts: {
      calories: 260,
      protein: 5,
      carbs: 45,
      fat: 8
    }
  },
  {
    id: '21',
    title: 'Butter Garlic Naan',
    description: 'Soft and fluffy Indian bread flavored with garlic and butter, perfect to pair with any curry.',
    category: ['Dinner', 'Vegetarian', 'Indian'],
    ingredients: [
      '3 cups all-purpose flour',
      '1 tsp baking powder',
      '1/2 tsp baking soda',
      '1 tbsp sugar',
      '1 tsp salt',
      '1/2 cup yogurt',
      '1/2 cup warm milk',
      '1 egg (optional)',
      '2 tbsp oil',
      'For Garlic Butter: 4 tbsp butter',
      '4-5 garlic cloves, minced',
      '2 tbsp chopped coriander leaves'
    ],
    instructions: [
      'In a bowl, mix flour, baking powder, baking soda, sugar, and salt.',
      'Add yogurt, warm milk, egg (if using), and oil. Knead into a soft dough.',
      'Cover and let it rest for 2-3 hours or until doubled in size.',
      'Divide the dough into 8 equal portions and shape into balls.',
      'Roll each ball into an oval or round shape, about 1/4 inch thick.',
      'Heat a tawa or non-stick pan over high heat.',
      'Place the rolled naan on the hot tawa, when bubbles start to form, flip and cook for a minute.',
      'Flip again and apply a little water on top, immediately cover with a lid for 30 seconds.',
      'For garlic butter, melt butter, add minced garlic and chopped coriander.',
      'Brush naans with garlic butter and serve hot with curry.'
    ],
    imageUrl: 'https://www.halfbakedharvest.com/wp-content/uploads/2019/02/Herbed-Garlic-Butter-Naan-1.jpg',
    prepTime: 20,
    cookTime: 15,
    servings: 8,
    difficulty: 'Medium',
    tags: ['Bread', 'Garlic', 'Restaurant Style'],
    createdBy: 'BreadMaster',
    youtubeLink: 'https://www.youtube.com/watch?v=zXGYl3d7oPQ',
    nutritionFacts: {
      calories: 230,
      protein: 5,
      carbs: 35,
      fat: 8
    }
  },
  {
    id: '22',
    title: 'Vegetable Biryani',
    description: 'A fragrant and flavorful one-pot rice dish loaded with mixed vegetables and aromatic spices.',
    category: ['Dinner', 'Vegetarian', 'Indian'],
    ingredients: [
      '2 cups basmati rice, soaked for 30 minutes',
      '3 cups mixed vegetables (carrot, beans, peas, cauliflower, potato)',
      '1 large onion, thinly sliced',
      '2 tomatoes, chopped',
      '2 tbsp ginger-garlic paste',
      '2-3 green chilies, slit',
      '1/4 cup yogurt',
      '1/4 cup mint leaves',
      '1/4 cup coriander leaves',
      '1 tsp cumin seeds',
      '1 bay leaf, 4 cloves, 1 cinnamon stick, 2 cardamoms',
      '1 tsp red chili powder',
      '1/2 tsp turmeric powder',
      '1 tbsp biryani masala',
      '3 tbsp ghee',
      'Saffron soaked in warm milk (optional)',
      'Fried onions for garnishing',
      'Salt to taste'
    ],
    instructions: [
      'Wash and soak rice for 30 minutes. Drain.',
      'Parboil the rice with whole spices until 70% cooked. Drain and set aside.',
      'Heat ghee in a heavy-bottomed pan. Add cumin seeds and whole spices.',
      'Add sliced onions and sauté until golden brown.',
      'Add ginger-garlic paste and green chilies. Sauté for 2 minutes.',
      'Add mixed vegetables and sauté for 5 minutes.',
      'Add tomatoes, spice powders, and salt. Cook until tomatoes are soft.',
      'Add yogurt and cook for 2 more minutes.',
      'Layer half of the parboiled rice over the vegetables.',
      'Sprinkle half of the mint and coriander leaves.',
      'Add remaining rice as the top layer.',
      'Pour saffron milk over the rice if using.',
      'Cover with a tight lid and cook on low heat for 20 minutes.',
      'Garnish with fried onions and serve hot with raita.'
    ],
    imageUrl: 'https://www.cookwithmanali.com/wp-content/uploads/2018/03/Instant-Pot-Vegetable-Biryani.jpg',
    prepTime: 30,
    cookTime: 40,
    servings: 6,
    difficulty: 'Medium',
    tags: ['Biryani', 'One-Pot', 'Festive'],
    createdBy: 'BiryaniSpecialist',
    youtubeLink: 'https://www.youtube.com/watch?v=oV7kRQr4hAc',
    nutritionFacts: {
      calories: 320,
      protein: 8,
      carbs: 56,
      fat: 9
    }
  }
];

// Functions to get recipes
export const getRecipeById = (id: string): Recipe | undefined => {
  return sampleRecipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return sampleRecipes.filter(recipe => 
    recipe.category.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
};

export const getFeaturedRecipes = (count: number = 3): Recipe[] => {
  // In a real app, this would use algorithms to determine which recipes to feature
  // For now, just return a few popular ones
  return sampleRecipes.slice(0, count);
};

export const getRecipesByTags = (tags: string[]): Recipe[] => {
  return sampleRecipes.filter(recipe => 
    recipe.tags.some(tag => tags.includes(tag))
  );
};
