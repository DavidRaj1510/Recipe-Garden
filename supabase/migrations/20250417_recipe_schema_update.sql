
-- Update recipes table structure to fix category issues
DO $$
BEGIN
    -- Check if we need to update the category column to use TEXT instead of TEXT[]
    IF EXISTS (SELECT FROM information_schema.columns 
              WHERE table_name = 'recipes' AND column_name = 'category' 
              AND data_type = 'ARRAY') THEN
        
        -- If recipes table has a category column as array, convert to TEXT
        ALTER TABLE public.recipes 
        ALTER COLUMN category TYPE TEXT USING 
        CASE 
            WHEN category IS NULL OR array_length(category, 1) IS NULL THEN NULL
            ELSE category[1]
        END;
    END IF;

    -- Add the youtubeLink column if it doesn't exist yet
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'recipes' AND column_name = 'youtubeLink') THEN
        ALTER TABLE public.recipes ADD COLUMN "youtubeLink" TEXT;
    END IF;
END
$$;

-- Ensure saved_recipes table exists
CREATE TABLE IF NOT EXISTS public.saved_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT saved_recipes_user_recipe_unique UNIQUE (user_id, recipe_id)
);

-- Set up RLS policies for saved_recipes if not already done
DO $$
BEGIN
    -- Enable RLS on the saved_recipes table
    ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
    
    -- Create select policy if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'saved_recipes' 
        AND policyname = 'Users can view their own saved recipes'
    ) THEN
        CREATE POLICY "Users can view their own saved recipes" 
        ON public.saved_recipes 
        FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    -- Create insert policy if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'saved_recipes' 
        AND policyname = 'Users can save recipes'
    ) THEN
        CREATE POLICY "Users can save recipes" 
        ON public.saved_recipes 
        FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    -- Create delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM pg_policies 
        WHERE tablename = 'saved_recipes' 
        AND policyname = 'Users can remove their saved recipes'
    ) THEN
        CREATE POLICY "Users can remove their saved recipes" 
        ON public.saved_recipes 
        FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;
