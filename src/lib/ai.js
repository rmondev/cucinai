// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

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

const hf = new HfInference(process.env.NEXT_PUBLIC_MINSTREL_AI_API_KEY)

export async function getAIrecipe(recipe, hasOptions = false, options=[]) {

    console.log('Entered getAIRecipe function')
    if (!recipe ) {
        console.error("No Recipe Object was passed to 'getAIrecipe'.");
        return;
    }
    
    if (hasOptions && options.length === 0) {
        console.error(`No Options were received by 'getRecipe'.`)
        return
    }

    let recipeTitle = recipe.title
    let ingredientsArr = recipe.ingredients
    let instructionsArr = recipe.instructions
   
    let ingredientsString = ingredientsArr
            .map(({ quantity, unit, name }) => `${quantity} ${unit} ${name}`)
            .join(', ')
    let instructionString = instructionsArr.join(" Next, ")
    // No Options
    
    if (!hasOptions && !options) {
        var msgUserContent = `I have a recipe titled "${recipeTitle}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}. Please give me a similar recipe based on the original ingredients and preparation instructions. Just include the new recipe, title and instruction steps. Make sure the response is purely formatted strictly in Markdown.`

        var SYSTEM_PROMPT = `
        You are an assistant that receives a recipe including a title, ingredients and instructions from the user. You suggest a new recipe, that is similar to the original recipe in either ingredients or instructions for preparation. The new recipe can be made with some or all of the ingredients of the original recipe. You don't need to use every ingredient from the users original recipe. The new recipe can include additional ingredients the user didn't mention, but try not to include too many extra ingredients. Format your response in strictly in Markdown with appropriate large, bold headings for recipe title (Recipe Title:), ingredients (Ingredients:) and instruction (Instructions: Step 1...Step2... etc) steps, to make it easier to render to a web page.
        `

    // With Options (Enhancements)
    } else {
        var optionsArr = options
        var optionsString = optionsArr
            .map((option)=> `${option}`)
            .join(', ') 

        var SYSTEM_PROMPT = `
        You are an assistant that receives a recipe including a title, ingredients and instructions from the user. You also receive a list of modifying criteria. You suggest a new recipe, based on certain modifying criteria the user gives you. The new recipe can be made with some or all of the ingredients of the original recipe as long as they don't contradict the criteria provided. You don't need to use every ingredient from the users original recipe. The recipe can include additional ingredients the user didn't mention, but try not to include too many extra ingredients. Format your response strictly in Markdown with appropriate large-bold headings for recipe title (Recipe Title:), ingredients (Ingredients:) and instruction (Instructions: Step 1...Step2... etc) steps, to make it easier to render to a web page.
        `

        var msgUserContent = `I have a recipe titled "${recipeTitle}". The ingredients are ${ingredientsString}. The instructions are ${instructionString}. The new recipe modifying criteria are: ${optionsString}. Please give me a recipe that is derived from the original recipe, modified with the criteria I provided you. Just include the new recipe, title and instruction steps. Make sure the response is purely formatted in strictly in Markdown with spacing between recipe title, ingredients and instructions sections and separate the instructions into numbered steps.`

       
        
    }


    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: msgUserContent },
            ],
            max_tokens: 1024,
        })

        console.log(response.choices[0].message.content)
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
