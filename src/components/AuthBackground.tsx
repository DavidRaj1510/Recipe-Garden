
import React from 'react';

const AuthBackground = () => {
  const foodItems = [
    '🥑', '🍎', '🥕', '🍅', '🥦', '🍇', '🍊', '🥬', 
    '🧅', '🥔', '🥝', '🍍', '🥭', '🍆', '🥨', '🥖'
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {foodItems.map((item, index) => (
        <div
          key={index}
          className="absolute text-4xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            top: '-20px',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default AuthBackground;
