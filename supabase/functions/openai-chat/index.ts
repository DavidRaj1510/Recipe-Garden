
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, context } = await req.json()

    const systemMessage = `You are an expert chef and recipe assistant. When asked about a recipe, provide:
    1. A clear, detailed list of ALL ingredients with exact measurements
    2. Step-by-step cooking instructions
    3. A descriptive recipe title
    
    Format your response like this:
    Recipe: [Recipe Name]
    
    Ingredients:
    - [ingredient 1 with exact measurement]
    - [ingredient 2 with exact measurement]
    (list all ingredients)
    
    Instructions:
    1. [First step]
    2. [Second step]
    (number all steps)
    
    Be extremely specific and thorough in your recipe instructions.`

    const messages = [
      { role: 'system', content: systemMessage },
    ]

    if (context?.length) {
      messages.push({ role: 'user', content: context.join('\n') })
    }

    messages.push({ role: 'user', content: `Provide a complete recipe for ${prompt}` })

    console.log('Calling OpenAI API with messages:', messages)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API response error:', response.status, errorData)
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    console.log('OpenAI API response:', data)

    if (data.error) {
      throw new Error(data.error.message || 'OpenAI API error')
    }

    const aiMessage = data.choices[0].message.content
    const recipeDetail = extractRecipeDetail(aiMessage)

    // Generate YouTube search links based on recipe name
    const youtubeLinks = await fetchRelevantYoutubeLinks(recipeDetail.name)
    
    const result = {
      message: aiMessage,
      recipeDetail: {
        ...recipeDetail,
        youtubeLinks: youtubeLinks
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in openai-chat function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function extractRecipeDetail(text: string) {
  let name = extractRecipeName(text)
  const ingredients = extractIngredients(text)
  const instructions = extractInstructions(text)

  return {
    name,
    ingredients,
    instructions
  }
}

function extractRecipeName(text: string): string {
  // Look for "Recipe:" pattern first
  const recipePattern = /Recipe:\s*([\w\s\-']+)(?:\n|$)/i
  const recipeMatch = text.match(recipePattern)
  if (recipeMatch && recipeMatch[1]) {
    return recipeMatch[1].trim()
  }

  // Fallback patterns
  const patterns = [
    /(?:recipe for|how to make)\s*([\w\s\-']+)(?:\?|\.|\s|$)/i,
    /^([\w\s\-']+)\s*recipe/i,
    /^([\w\s\-']+)\s*:/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  // If no pattern matches, use first line
  const firstLine = text.split('\n')[0].trim()
  if (firstLine && firstLine.length < 50) {
    return firstLine
  }

  return "Recipe"
}

function extractIngredients(text: string): string[] {
  const ingredientsRegex = /ingredients:?\s*([\s\S]*?)(?:instructions|steps|directions|method|preparation|$)/i
  const match = text.match(ingredientsRegex)
  
  if (match && match[1]) {
    return match[1]
      .split('\n')
      .map(item => item.replace(/^[-*•]\s*|\d+\.\s*/g, '').trim())
      .filter(item => item.length > 0 && !item.toLowerCase().includes('ingredients'))
  }
  
  // Fallback - look for bullet points or numbered lists
  const lines = text.split('\n')
  let isInIngredients = false
  const ingredients: string[] = []
  
  for (const line of lines) {
    if (line.toLowerCase().includes('ingredients:') || line.toLowerCase() === 'ingredients') {
      isInIngredients = true
      continue
    }
    
    if (isInIngredients && (line.toLowerCase().includes('instructions:') || 
                           line.toLowerCase().includes('steps:') ||
                           line.toLowerCase().includes('directions:') ||
                           line.toLowerCase().includes('method:'))) {
      break
    }
    
    if (isInIngredients && line.trim() && 
       (line.match(/^[-*•]/) || line.match(/^\d+\./) || line.includes(' - '))) {
      ingredients.push(line.replace(/^[-*•]\s*|\d+\.\s*/g, '').trim())
    }
  }
  
  return ingredients.length > 0 ? ingredients : ["Please specify a recipe to get ingredients"]
}

function extractInstructions(text: string): string[] {
  const instructionsRegex = /(?:instructions|steps|directions|method):?\s*([\s\S]*?)(?:notes|tips|$)/i
  const match = text.match(instructionsRegex)
  
  if (match && match[1]) {
    return match[1]
      .split('\n')
      .map(item => item.replace(/^[-*•]\s*|\d+\.\s*/g, '').trim())
      .filter(item => item.length > 0 && !item.toLowerCase().includes('instructions'))
  }
  
  // Fallback - look for numbered steps
  const lines = text.split('\n')
  let isInInstructions = false
  const instructions: string[] = []
  
  for (const line of lines) {
    if (line.toLowerCase().includes('instructions:') || 
        line.toLowerCase().includes('steps:') ||
        line.toLowerCase().includes('directions:') ||
        line.toLowerCase().includes('method:')) {
      isInInstructions = true
      continue
    }
    
    if (isInInstructions && 
       (line.toLowerCase().includes('notes:') || line.toLowerCase().includes('tips:'))) {
      break
    }
    
    if (isInInstructions && line.trim() && 
       (line.match(/^\d+\./) || line.match(/^step \d+:/i))) {
      instructions.push(line.replace(/^step \d+:\s*|\d+\.\s*/i, '').trim())
    }
  }
  
  return instructions.length > 0 ? instructions : ["Please specify a recipe to get instructions"]
}

async function fetchRelevantYoutubeLinks(recipeName: string) {
  try {
    const formattedName = encodeURIComponent(recipeName.trim())
    
    return [
      {
        title: `How to Make ${recipeName} - Step by Step Recipe Tutorial`,
        url: `https://www.youtube.com/results?search_query=${formattedName}+recipe+tutorial+cooking`
      },
      {
        title: `${recipeName} Recipe by Professional Chefs`,
        url: `https://www.youtube.com/results?search_query=${formattedName}+recipe+chef+professional`
      },
      {
        title: `Authentic ${recipeName} Recipe`,
        url: `https://www.youtube.com/results?search_query=authentic+traditional+${formattedName}+recipe`
      },
      {
        title: `Easy ${recipeName} Recipe Guide`,
        url: `https://www.youtube.com/results?search_query=easy+${formattedName}+recipe+guide`
      }
    ]
  } catch (error) {
    console.error('Error generating YouTube links:', error)
    return [
      {
        title: `${recipeName} Recipes`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(recipeName)}+recipe`
      }
    ]
  }
}
