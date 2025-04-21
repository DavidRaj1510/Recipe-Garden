
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../utils/recipeData';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, featured = false }) => {
  const { id, title, description, imageUrl, prepTime, cookTime, servings, difficulty, category } = recipe;
  
  // Determine the card size based on whether it's featured
  const cardClasses = featured 
    ? "recipe-card flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden" 
    : "recipe-card flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden";
    
  const imageClasses = featured
    ? "md:w-2/5 h-48 md:h-full"
    : "w-full h-40 md:h-48";
    
  const contentClasses = featured
    ? "p-4 md:p-6 flex-1"
    : "p-4 flex-1 flex flex-col";

  return (
    <Link to={`/recipe/${id}`} className={cardClasses}>
      <div className={imageClasses}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className={contentClasses}>
        <div className="flex gap-2 flex-wrap mb-2">
          {category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-xs bg-recipe-cream text-recipe-orange px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
          <span className={`text-xs px-2 py-1 rounded-full ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {featured ? description : description.substring(0, 80) + (description.length > 80 ? '...' : '')}
        </p>
        
        <div className="flex justify-between items-center text-gray-500 text-sm mt-auto">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{prepTime + cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{servings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
