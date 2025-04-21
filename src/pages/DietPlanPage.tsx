
import React from 'react';
import DietMaintenance from '../components/DietMaintenance';
import AiDietCoach from '../components/AiDietCoach';

const DietPlanPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Personalized Nutrition Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get AI-powered diet recommendations based on your body metrics, activity level, and goals.
          Our system will create a customized plan to help you reach your nutrition goals.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <DietMaintenance />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <AiDietCoach />
      </div>
      
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">About Our AI Diet Recommendations</h2>
        <p className="mb-4">
          Our AI-powered diet recommendations are designed to help you achieve your health and fitness goals
          through personalized nutrition advice. Here's how our system works:
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">Calorie Calculation</h3>
            <p className="text-gray-700">
              We use the Mifflin-St Jeor equation, which is considered one of the most accurate methods for estimating 
              basal metabolic rate (BMR). Your activity level is then factored in to determine your total daily energy 
              expenditure (TDEE).
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg">Macronutrient Distribution</h3>
            <p className="text-gray-700">
              Based on your goals, we recommend an optimal distribution of proteins, carbohydrates, and fats.
              For example, higher protein for muscle building goals or more balanced macros for maintenance.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg">Food Suggestions</h3>
            <p className="text-gray-700">
              Our AI provides practical meal ideas that align with your calorie and macro targets, taking into
              consideration common food preferences and practical meal planning.
            </p>
          </div>
          
          <div className="bg-recipe-cream p-4 rounded-lg">
            <p className="text-sm text-gray-600 italic">
              Note: While our AI provides general guidance based on established nutritional science, it's important
              to consult with a registered dietitian or healthcare provider for personalized medical advice,
              especially if you have specific health conditions or dietary restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanPage;
