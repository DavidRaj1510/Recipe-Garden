
import React from 'react';

const images = [
  'https://recipesblob.oetker.co.uk/assets/df6a7bf3c264495d80c24b3972738ae6/1272x764/banana-pancakes.webp',
  'https://recipesblob.oetker.co.uk/assets/df6a7bf3c264495d80c24b3972738ae6/1272x764/banana-pancakes.webp',
  'https://recipesblob.oetker.co.uk/assets/df6a7bf3c264495d80c24b3972738ae6/1272x764/banana-pancakes.webp',
  'https://recipesblob.oetker.co.uk/assets/df6a7bf3c264495d80c24b3972738ae6/1272x764/banana-pancakes.webp'
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay to ensure form readability */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 animate-fade-slide"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: `fade-slide 20s infinite ${index * 5}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
