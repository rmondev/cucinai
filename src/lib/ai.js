// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

// 🔧 Enhancement Options for a Recipe
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

const SYSTEM_PROMPT = `
You are an assistant that receives a recipe including a title, ingredients and instructions that a user has. You suggest a new recipe, with a spin on the recipe the user shared with you that is a unhealthy and richer, just like a mother would have made. The new recipe can be made with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown with appropriate headings for recipe title, ingredients and instructions steps, to make it easier to render to a web page.
`


// Make sure you set an environment variable in env.local 
// for HF_ACCESS_TOKEN
const hf = new HfInference(process.env.NEXT_PUBLIC_MINSTREL_AI_API_KEY)

export async function getAIrecipe(recipe, options) {
    if (!recipe ) {
        console.error("No Recipe Object was passed to 'getAIrecipe'.");
        return;
    }
    
    if (!options) {
        console.error(`No Options were received by 'getRecipe'.`)
    }


    console.log("Minstrel API Key: " + process.env.NEXT_PUBLIC_MINSTREL_AI_API_KEY);

    let recipeTitle = recipe.title
    let ingredientsArr = recipe.ingredients
    let instructionsArr = recipe.instructions
    
    // Need to destructure the recipe.ingredients array of objects [{name: 'Apples', quantity: 1, unit: 'Cup'}, {name: 'Cake Flour', quantity: 2, unit: 'Cup'}] and join them together in a string ie. "1 Cup Apples, 2 Cup Cake Flour" 
    const ingredientsString = ingredientsArr
    .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
    .join(', ')




    const instructionString = recipe.instructions.join(" Next, ")

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have a recipe titled "${recipeTitle}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}. Please give me a recipe that is more unhealthy and richer! Just include the new recipe, title and instruction steps.` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
