
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getRecipesByCategory, categories } from '../utils/recipeData';
import SearchBar from '../components/SearchBar';

const CategoryPage: React.FC = () => {
  const { category = '' } = useParams<{ category: string }>();
  const recipes = getRecipesByCategory(category);
  
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{formattedCategory} Recipes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of delicious {category.toLowerCase()} recipes perfect for any occasion.
        </p>
        
        <div className="max-w-md mx-auto mt-6">
          <SearchBar />
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className={`category-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                cat.toLowerCase() === category.toLowerCase() 
                ? 'bg-recipe-green text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
      
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No recipes found</h2>
          <p className="text-gray-600">
            We couldn't find any recipes in the {formattedCategory} category.
            Please try another category or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
