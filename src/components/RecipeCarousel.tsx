
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Link } from 'react-router-dom';
import { Recipe } from '../utils/recipeData';

interface RecipeCarouselProps {
  recipes: Recipe[];
}

const RecipeCarousel = ({ recipes }: RecipeCarouselProps) => {
  return (
    <div className="relative py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/recipe/${recipe.id}`} className="block group">
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-2 flex-wrap mb-2">
                      {recipe.category.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-recipe-orange bg-opacity-90 px-3 py-1 rounded-full text-white"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl text-white font-bold">{recipe.title}</h3>
                    <p className="text-gray-200 text-sm mt-2">
                      {recipe.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default RecipeCarousel;
