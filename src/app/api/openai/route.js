import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 🔧 Enhancement Options for a Recipe

// You are an assistant that receives a recipe including a title, ingredients and instructions from the user. You suggest a new recipe, based on certain criteria the user gives you. The new recipe can be made with some or all of the ingredients of the original recipe. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients the user didn't mention, but try not to include too many extra ingredients. Format your response in markdown with appropriate headings for recipe title, ingredients and instruction steps, to make it easier to render to a web page.

// 🔹 Health-Focused Enhancements
// Make it Healthier – Reduce fats, sugars, or processed ingredients.
// Make it High-Protein – Increase protein content using ingredients like beans, meats, or dairy.
// Make it Lower-Carb – Reduce carbs, use alternatives (e.g., cauliflower instead of pasta).
// Make it Low-Calorie – Adjust portions and high-calorie ingredients.
// Make it Vegan or Vegetarian – Replace meat or dairy with plant-based alternatives.
// Make it Gluten-Free – Replace wheat-based ingredients with alternatives.

// 🔹 Flavor-Based Enhancements
// Make it Spicy – Add chili, pepper, or other heat-enhancing ingredients.
// Add Bold Flavors – Boost flavor intensity with herbs, citrus, umami (e.g., miso, anchovy).
// Make it Sweet or Dessert-Like – Add natural or artificial sweetness.

// 🔹 Ingredient Substitutions
// Use Pantry Staples Only – Replace fancy ingredients with common ones.
// Make it Dairy-Free – Use non-dairy substitutes like oat milk, vegan butter, etc.
// Make it Nut-Free – Remove or replace nuts with safe alternatives.

// 🔹 Cultural/Style-Based Enhancements
// Give it an Italian Twist – Add herbs, cheeses, and Mediterranean elements.
// Make it Asian-Inspired – Introduce soy, ginger, sesame, rice noodles, etc.
// Add a Mexican Flair – Include cumin, lime, tortillas, chilis, beans.
// Make it Comfort Food – Heavier, richer, indulgent version.

// 🔹 Other Fun Ideas
// Simplify the Recipe – Reduce steps, simplify techniques.
// Make it Faster to Prepare – Convert to a 15–30 minute meal.
// Make it Kid-Friendly – Mild, familiar flavors and presentation.
// Make it Fancy/Gourmet – Refine presentation, elevate ingredients.

// Make sure you set an environment variable in env.local 
// for HF_ACCESS_TOKEN

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  
  export async function POST(req) {
    try {
      const { recipe, hasOptions, options } = await req.json();
  
      if (!recipe) {
        return NextResponse.json({ error: 'Missing recipe' }, { status: 400 });
      }
  
      const { title, ingredients, instructions } = recipe;
  
      const ingredientsString = ingredients
        .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
        .join(', ');
  
      const instructionString = instructions.join(' Next, ');
  
      let userMessage = '';
      let systemPrompt = '';
  
      if (!hasOptions || options.length === 0) {
        systemPrompt = `
          You are an assistant that receives a recipe including a title, ingredients, and instructions.
          You suggest a new recipe that is similar to the original one. It can reuse some or all original ingredients, and optionally introduce a few new ones.
          Format your response strictly in Markdown with **bold section headers** like:
          - Recipe Title:
          - Ingredients:
          - Instructions: (Step 1, Step 2, etc.)
        `;
  
        userMessage = `
          I have a recipe titled "${title}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}.
          Please give me a similar recipe based on the original ingredients and preparation instructions.
        `;
      } else {
        const optionsString = options.join(', ');
  
        systemPrompt = `
          You are an assistant that receives a recipe and enhancement criteria. 
          Based on the criteria, suggest a modified recipe. 
          Format your response strictly in Markdown with **bold section headers** like:
          - Recipe Title:
          - Ingredients:
          - Instructions: (Step 1, Step 2, etc.)
        `;
  
        userMessage = `
          I have a recipe titled "${title}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}.
          The enhancement criteria are: ${optionsString}.
          Please return a modified recipe based on these criteria.
        `;
      }
  
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-4', // or 'gpt-3.5-turbo' for lower cost
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.8,
        max_tokens: 1024,
      });
  
      const responseText = chatResponse.choices[0].message.content;
      return NextResponse.json({ result: responseText });
    } catch (err) {
      console.error('OpenAI Route Error:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  