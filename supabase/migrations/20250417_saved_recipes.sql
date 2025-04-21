
-- This migration ensures we have the necessary tables for recipe saving functionality
-- First, check if tables already exist to avoid errors

-- Check if the recipes table exists and create if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'recipes' AND schemaname = 'public') THEN
        CREATE TABLE public.recipes (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            description TEXT,
            ingredients TEXT[] NOT NULL,
            instructions TEXT[] NOT NULL,
            youtubeLink TEXT,  -- Ensure this column exists for YouTube links
            category TEXT[], -- Changed to TEXT[] to match your array usage
            image_url TEXT,
            difficulty TEXT,
            cooking_time INTEGER, -- Changed from separate prep/cook time
            servings INTEGER DEFAULT 4,
            tags TEXT[],
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            user_id UUID REFERENCES auth.users NOT NULL
        );
        
        -- Add RLS policies for recipes table
        ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view all recipes" 
            ON public.recipes FOR SELECT USING (true);
            
        CREATE POLICY "Users can insert their own recipes" 
            ON public.recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update their own recipes" 
            ON public.recipes FOR UPDATE USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can delete their own recipes" 
            ON public.recipes FOR DELETE USING (auth.uid() = user_id);
    END IF;

    -- Check if the saved_recipes table exists and create if it doesn't
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'saved_recipes' AND schemaname = 'public') THEN
        CREATE TABLE public.saved_recipes (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users NOT NULL,
            recipe_id UUID REFERENCES public.recipes NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            UNIQUE(user_id, recipe_id)
        );
        
        -- Add RLS policies for saved_recipes table
        ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own saved recipes" 
            ON public.saved_recipes FOR SELECT USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can save recipes" 
            ON public.saved_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can remove their saved recipes" 
            ON public.saved_recipes FOR DELETE USING (auth.uid() = user_id);
    END IF;

    -- Alter recipes table to add or modify columns if they don't exist
    IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'recipes' AND schemaname = 'public') THEN
        -- Add youtubeLink column if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'recipes' AND column_name = 'youtubeLink') THEN
            ALTER TABLE public.recipes ADD COLUMN youtubeLink TEXT;
        END IF;
        
        -- Change category to array if it's not already
        IF EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'recipes' AND column_name = 'category' 
                  AND data_type != 'ARRAY') THEN
            ALTER TABLE public.recipes 
            ALTER COLUMN category TYPE TEXT[] USING ARRAY[category];
        END IF;
    END IF;
END
$$;
