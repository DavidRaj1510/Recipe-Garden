
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { X, PlusCircle } from 'lucide-react';
import { categories } from '../utils/recipeData';

const recipeFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  ingredients: z.array(
    z.object({
      value: z.string().min(1, { message: "Ingredient cannot be empty" })
    })
  ).min(1, { message: "Add at least one ingredient" }),
  instructions: z.array(
    z.object({
      value: z.string().min(1, { message: "Instruction step cannot be empty" })
    })
  ).min(1, { message: "Add at least one instruction step" }),
  cookingTime: z.string().min(1, { message: "Cooking time is required" }),
  difficulty: z.string().min(1, { message: "Difficulty level is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  imageUrl: z.string().optional(),
});

const CreateRecipePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: [{ value: '' }],
      instructions: [{ value: '' }],
      cookingTime: '',
      difficulty: '',
      category: '',
      imageUrl: '',
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const onSubmit = async (values: z.infer<typeof recipeFormSchema>) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'You must be logged in to create a recipe',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            title: values.title,
            description: values.description,
            ingredients: values.ingredients.map(i => i.value),
            instructions: values.instructions.map(i => i.value),
            cooking_time: parseInt(values.cookingTime),
            difficulty: values.difficulty,
            category: values.category,
            image_url: values.imageUrl || 'https://source.unsplash.com/featured/?food,' + values.title.toLowerCase(),
            user_id: user.id,
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Recipe created',
        description: 'Your recipe has been created successfully',
      });

      navigate(`/recipe/${data[0].id}`);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error creating recipe',
        description: error.message || 'An error occurred while creating your recipe',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Homemade Pancakes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your recipe in a few sentences" 
                            className="resize-none min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cooking Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave blank to use a generated image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormLabel className="block mb-2">Ingredients</FormLabel>
                  <div className="space-y-2">
                    {ingredientFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1 mb-0">
                              <FormControl>
                                <Input placeholder={`Ingredient ${index + 1}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                          disabled={ingredientFields.length === 1}
                          className="h-10 w-10 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => appendIngredient({ value: '' })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Ingredient
                  </Button>
                </div>
                
                <div className="md:col-span-2">
                  <FormLabel className="block mb-2">Instructions</FormLabel>
                  <div className="space-y-2">
                    {instructionFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-2">
                        <span className="mt-2 text-sm font-medium text-gray-500">
                          {index + 1}.
                        </span>
                        <FormField
                          control={form.control}
                          name={`instructions.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1 mb-0">
                              <FormControl>
                                <Textarea 
                                  placeholder={`Step ${index + 1}`} 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                          disabled={instructionFields.length === 1}
                          className="h-10 w-10 rounded-full mt-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => appendInstruction({ value: '' })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Step
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-recipe-green hover:bg-recipe-darkGreen"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Recipe'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRecipePage;
