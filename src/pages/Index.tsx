import React from 'react';
import FeaturedRecipe from '../components/FeaturedRecipe';
import RecipeCard from '../components/RecipeCard';
import RecipeCarousel from '../components/RecipeCarousel';
import AiCoach from '../components/AiCoach';
import { getFeaturedRecipes, getRecipesByCategory } from '../utils/recipeData';
import { initializeGeminiAPI } from '../utils/aiHelpers';
import { Link } from 'react-router-dom';

const geminiAPI = initializeGeminiAPI("AIzaSyDva-oMirya5l0oHVnhGJ6NPxOqr1D_LMw");

const Index: React.FC = () => {
  const allRecipes = [
    ...getRecipesByCategory('breakfast'),
    ...getRecipesByCategory('lunch'),
    ...getRecipesByCategory('dinner'),
    ...getRecipesByCategory('healthy'),
  ];

  const featuredRecipes = getFeaturedRecipes(1);

  const breakfastRecipes = getRecipesByCategory('breakfast').slice(0, 3);
  const lunchRecipes = getRecipesByCategory('lunch').slice(0, 3);
  const healthyRecipes = getRecipesByCategory('healthy').slice(0, 3);
  const snackRecipes = getRecipesByCategory('snacks').slice(0, 3);

  const categoryImageUrls: { [key: string]: string } = {
    'Breakfast': 'https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20180821150600/Indian-Breakfast.jpg',
    'Lunch': 'https://www.funfoodfrolic.com/wp-content/uploads/2019/08/3.jpg',
    'Dinner': 'https://static.toiimg.com/photo/74984407.cms',
    'Healthy': 'https://www.foodbusinessnews.net/ext/resources/2022/10/03/fresh-foods_AdobeStock_LEAD.jpeg?height=667&t=1664819046&width=1080',
    'Workout': 'https://cdn.centr.com/content/20000/19819/images/landscapewidedesktop1x-c91f999ed1fc90f8458374f4e172a615-grilled-chicken-warm-potato-salad-was-chicken-spinach-potato-salad-169.jpg',
    'Diet Plan': 'https://www.savorynothings.com/wp-content/uploads/2018/06/berry-fruit-salad-image-sq-2.jpg',
  };

  return (
    <div>
      <section className="container mx-auto pt-6">
        <RecipeCarousel recipes={allRecipes} />
      </section>

      <section className="container mx-auto pt-6 pb-12">
        {featuredRecipes.length > 0 && (
          <FeaturedRecipe recipe={featuredRecipes[0]} />
        )}
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Breakfast', 'Lunch', 'Dinner', 'Healthy', 'Workout', 'Diet Plan'].map((category) => (
            <Link 
              key={category} 
              to={category === 'Diet Plan' ? '/diet-plan' : `/category/${category.toLowerCase()}`}
              className="group relative h-36 rounded-xl overflow-hidden"
            >
              <img 
                src={categoryImageUrls[category]} 
                alt={category} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <h3 className="text-white font-medium text-lg">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <AiCoach />
        </div>
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Breakfast Ideas</h2>
          <Link 
            to="/category/breakfast" 
            className="text-recipe-green hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breakfastRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {lunchRecipes.length > 0 && (
        <section className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lunch Recipes</h2>
            <Link 
              to="/category/lunch" 
              className="text-recipe-green hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lunchRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {healthyRecipes.length > 0 && (
        <section className="bg-gray-50 py-12 mt-8">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Healthy Options</h2>
              <Link 
                to="/category/healthy" 
                className="text-recipe-green hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthyRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {snackRecipes.length > 0 && (
        <section className="container mx-auto py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Snacks</h2>
            <Link 
              to="/category/snacks" 
              className="text-recipe-green hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {snackRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/diet-plan"
              className="inline-block bg-recipe-green hover:bg-recipe-darkGreen text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Personalized Diet Plan
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
