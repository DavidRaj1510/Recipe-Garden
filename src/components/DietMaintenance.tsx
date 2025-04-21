
import React, { useState } from 'react';
import { getDietRecommendations } from '../utils/aiHelpers';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const DietMaintenance = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || !height || !age || !gender || !activityLevel || !goal) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const results = await getDietRecommendations(
        Number(weight),
        Number(height),
        Number(age),
        gender,
        activityLevel,
        goal
      );
      
      setRecommendations(results);
      toast({
        title: "Diet Plan Generated",
        description: "Your personalized nutrition plan is ready!"
      });
    } catch (error) {
      console.error("Error getting diet recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate diet recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-recipe-green p-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M16 2c.5 0 1 .17 1.4.44l.93.93a2 2 0 0 0 1.1.55l1.32.13a2 2 0 0 1 1.8 2l-.13 1.33c-.06.4-.26.8-.55 1.1l-.93.93a2 2 0 0 0-.44 1.4v1.33a2 2 0 0 0 .44 1.4l.93.93c.29.3.49.7.55 1.1l.13 1.33a2 2 0 0 1-1.8 2l-1.32.13c-.4.06-.8.26-1.1.55l-.93.93a2 2 0 0 1-1.4.44h-1.33a2 2 0 0 1-1.4-.44l-.93-.93a2 2 0 0 0-1.1-.55l-1.32-.13a2 2 0 0 1-1.8-2l.13-1.33c.06-.4.26-.8.55-1.1l.93-.93a2 2 0 0 0 .44-1.4v-1.33a2 2 0 0 0-.44-1.4l-.93-.93a2 2 0 0 1-.55-1.1l-.13-1.33a2 2 0 0 1 1.8-2l1.32-.13c.4-.06.8-.26 1.1-.55l.93-.93a2 2 0 0 1 1.4-.44z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
        <h3 className="text-white font-medium text-lg">Personalized Diet Plan</h3>
      </div>
      
      <div className="p-5">
        {!recommendations ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="weight">
                  Weight (kg)
                </label>
                <Input
                  id="weight"
                  type="number"
                  min="30"
                  max="250"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="height">
                  Height (cm)
                </label>
                <Input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  placeholder="Enter your height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  min="13"
                  max="120"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender">
                  Gender
                </label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="activityLevel">
                  Activity Level
                </label>
                <Select value={activityLevel} onValueChange={setActivityLevel} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="sedentary">Sedentary (Office job, little exercise)</SelectItem>
                      <SelectItem value="light">Light (Exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (Exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (Exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very active">Very Active (Physical job or 2x/day training)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal">
                  Goal
                </label>
                <Select value={goal} onValueChange={setGoal} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="lose weight">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain weight">Gain Weight</SelectItem>
                      <SelectItem value="build muscle">Build Muscle</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-recipe-orange hover:bg-recipe-darkOrange"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                "Generate Diet Plan"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Your Diet Plan</h3>
              <Button 
                variant="outline" 
                onClick={() => setRecommendations(null)}
                className="text-sm"
              >
                Start Over
              </Button>
            </div>
            
            <div className="bg-recipe-cream rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-white rounded-md">
                  <p className="text-sm text-gray-600">Daily Calories</p>
                  <p className="text-xl font-bold text-recipe-green">{recommendations.dailyCalories}</p>
                </div>
                <div className="text-center p-2 bg-white rounded-md">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="font-bold">{recommendations.macros.protein}</p>
                </div>
                <div className="text-center p-2 bg-white rounded-md">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="font-bold">{recommendations.macros.carbs}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium mb-2">Sample Meal Plan:</h4>
              
              <div className="border rounded-lg overflow-hidden">
                <div 
                  onClick={() => toggleSection('breakfast')}
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium">Breakfast Ideas</span>
                  {expandedSection === 'breakfast' ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                {expandedSection === 'breakfast' && (
                  <div className="p-3 border-t">
                    <ul className="list-disc pl-5">
                      {recommendations.mealPlan?.breakfast.map((meal: string, i: number) => (
                        <li key={i} className="py-1">{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div 
                  onClick={() => toggleSection('lunch')}
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium">Lunch Ideas</span>
                  {expandedSection === 'lunch' ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                {expandedSection === 'lunch' && (
                  <div className="p-3 border-t">
                    <ul className="list-disc pl-5">
                      {recommendations.mealPlan?.lunch.map((meal: string, i: number) => (
                        <li key={i} className="py-1">{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div 
                  onClick={() => toggleSection('dinner')}
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium">Dinner Ideas</span>
                  {expandedSection === 'dinner' ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                {expandedSection === 'dinner' && (
                  <div className="p-3 border-t">
                    <ul className="list-disc pl-5">
                      {recommendations.mealPlan?.dinner.map((meal: string, i: number) => (
                        <li key={i} className="py-1">{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div 
                  onClick={() => toggleSection('snacks')}
                  className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium">Snack Ideas</span>
                  {expandedSection === 'snacks' ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
                {expandedSection === 'snacks' && (
                  <div className="p-3 border-t">
                    <ul className="list-disc pl-5">
                      {recommendations.mealPlan?.snacks.map((meal: string, i: number) => (
                        <li key={i} className="py-1">{meal}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietMaintenance;
