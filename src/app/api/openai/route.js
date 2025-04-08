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
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const enhancementDetails = {
    'Healthier': 'Healthier – Include more organic ingredients and reduce refined ingredients and unhealthy fats.',
    'High Protein': 'High Protein – Increase protein content using beans, meats, dairy, or tofu.',
    'Lower-Carb': 'Lower-Carb – Reduce carbohydrates by using alternatives like cauliflower or zucchini.',
    'Vegan': 'Vegan – Replace all meat and dairy ingredients with plant-based alternatives.',
    'Gluten-Free': 'Gluten-Free – Use gluten-free grains and avoid wheat-based products.',
    'Dessert-Like': 'Dessert-Like – Transform or sweeten the dish to resemble a dessert using natural sweeteners.',
    'Dairy-Free': 'Dairy-Free – Remove all dairy ingredients and use non-dairy substitutes such as oat milk, almond milk and coconut oil instead of butter.',
    'Nut-Free': 'Nut-Free – Remove nuts and replace with seeds or safe alternatives.',
    'Italian Twist': 'Italian Twist – Add Italian herbs, cheese, tomatoes, and Mediterranean flair.',
    'Asian-Inspired': 'Asian-Inspired – Incorporate flavors like soy sauce, ginger, sesame oil, and rice noodles.',
    'Mexican Flair': 'Mexican Flair – Include cumin, lime, beans, tortillas, chili peppers, and avocado.',
    'Simplify': 'Simplify – Reduce cooking steps and streamline ingredients.',
    'Prepare Faster': 'Prepare Faster – Convert the recipe to take 15–30 minutes using quick techniques.',
    'Kid-Friendly': 'Kid-Friendly – Use familiar flavors and mild seasoning. Make the dish easy to eat.',
    'Fancy/Gourmet': 'Fancy/Gourmet – Refine ingredients and presentation for a gourmet experience.'
  };


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
         
        `;
  
        userMessage = `
          I have a recipe titled "${title}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}.
          Please return me a similar recipe based on the original ingredients and preparation instructions. Always provide a unit for each ingredient, even if it's just an empty string if not applicable.
        `;
      } else {

        //Use a switch case here to add more detail to each option, then build the optionsString with better detail for each option

        const detailedOptions = options
        .map(option => enhancementDetails[option] || option)
        .join(', ');



  
        systemPrompt = `
          You are an assistant that receives a recipe and enhancement criteria. 
          Based on the criteria, suggest a modified recipe. 
        `;
  
        userMessage = `
          I have a recipe titled "${title}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}.
          The enhancement criteria are: ${detailedOptions}. Return a recipe that is an altered version of the one I gave you, based on the enhancement criteria I provided. Always provide a unit for each ingredient, even if it's just an empty string if not applicable.
        `;
      }


      //OpenAI function calling, returning a structured object
      console.time('openai-call');
      const chatResponse = await openai.chat.completions.create({
        // model: 'gpt-3.5-turbo-1106',
        model: 'gpt-4',
        messages: [
          {role: 'system', content: systemPrompt},
          {role: 'user', content: userMessage}
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'return_enhanced_recipe',
              description: 'Returns a recipe in structured format',
              parameters: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  ingredients: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        quantity: { type: 'number' },
                        unit: { type: 'string' },
                        name: { type: 'string' }
                      },
                      required: ['quantity', 'unit', 'name']
                    }
                  },
                  instructions: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['title', 'ingredients', 'instructions']
              }
            }
          }
        ],
        tool_choice: {type: 'function', function:{name: 'return_enhanced_recipe'}},
        temperature: 0.7,
        max_tokens: 2048

      })

      console.timeEnd('openai-call');

      const toolCall = chatResponse.choices[0]?.message?.tool_calls?.[0]
      if (!toolCall || !toolCall.function?.arguments) {
        console.error('No structured data returned:', chatResponse);
        return NextResponse.json({ error: 'No structured data returned' }, { status: 500 });
      }
      


      const parsed = JSON.parse(toolCall.function.arguments);

      // 🛠️ Sanitize units so they’re not null
      parsed.ingredients = parsed.ingredients.map((ingredient) => ({
        ...ingredient,
        unit: ingredient.unit ?? '',
        quantity:ingredient.quantity ?? '',
        name: ingredient.name ?? ''
      }));

      return NextResponse.json(parsed);

      } catch (error) {
      console.error('Error in OpenAI API route:', error);
    
      return NextResponse.json(
        { error: error.message || 'Something went wrong' },
        { status: 500 }
      );
    }


  
    //   const chatResponse = await openai.chat.completions.create({
    //     model: 'gpt-4', // or 'gpt-3.5-turbo' for lower cost
    //     messages: [
    //       { role: 'system', content: systemPrompt },
    //       { role: 'user', content: userMessage },
    //     ],
    //     temperature: 0.8,
    //     max_tokens: 1024,
    //   });
  
    //   const responseText = chatResponse.choices[0].message.content;
    //   return NextResponse.json({ result: responseText });
    // } catch (err) {
    //   console.error('OpenAI Route Error:', err);
    //   return NextResponse.json({ error: err.message }, { status: 500 });
    // }
  }
  