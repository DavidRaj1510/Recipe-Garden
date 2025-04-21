
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../utils/recipeData';

interface FeaturedRecipeProps {
  recipe: Recipe;
}

const FeaturedRecipe: React.FC<FeaturedRecipeProps> = ({ recipe }) => {
  const { id, title, description, imageUrl, prepTime, cookTime, servings, category } = recipe;

  return (
    <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex gap-2 flex-wrap mb-3">
          {category.map((cat) => (
            <span
              key={cat}
              className="text-xs md:text-sm bg-recipe-orange bg-opacity-90 px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-bold mb-2">{title}</h2>
        
        <p className="text-sm md:text-base text-gray-200 mb-4 max-w-2xl">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-sm">{prepTime + cookTime} min</span>
            </span>
            <span className="flex items-center gap-1">
              <Users size={16} />
              <span className="text-sm">{servings} servings</span>
            </span>
          </div>
          
          <Link 
            to={`/recipe/${id}`}
            className="inline-block bg-recipe-green text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-200 text-sm font-medium"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;
