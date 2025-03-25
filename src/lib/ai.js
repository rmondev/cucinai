// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

// const SYSTEM_PROMPT = `
// You are an assistant that receives a recipe including a title, ingredients and instructions that a user has. You suggest a new recipe, that is a fun and silly spin on the recipe the user gave you. The new recipe can be made with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
// `

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
