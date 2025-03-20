"use client";
import React, { use, useState } from "react";
import UserAuth from '../context/AuthContext'

const AddRecipe = () => {
    // State ==========================================

    const [showForm, setShowForm] = useState(false)
    const [recipe, setRecipe] = useState({
        ingredients: [],
        instructions: []
    }

    // {
    // ingredients: [{ name: "Apples", unit: "Cup", quantity: "1" }, { name: "Apples", unit: "Cup", quantity: "1" }, { name: "Apples", unit: "Cup", quantity: "1" }],
    // instructions: ['1. Peel Apples blach sdad asdasdas dasdasda asdasdasda.', '2. Cut Apples asdasdasdasdasdasdadadadassda. dsadasdasdasdasdasdas.adasda. asdadadasdasda adsdas asdasda asdasdasd asdasdadad.', '3. Cook Apples sadad asdasda as sadasda asdaasda dsd dsdasadsdss d sd sdsadasdasd.'],
    // }
    
);

    



  // Elements ==========================================
  const ingredientsList = () => (
    recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="flex flex-row">
            <p className="mr-8">{ingredient.quantity}</p>
            <p className="mr-8">{ingredient.unit}</p>
            <p className="mr-8">{ingredient.name}</p>
        </div>
    ))
);

  const instructionsList = () => (
        recipe.instructions.map((step, index) => (
            <p key={index}>{step}</p>
        ))
    );

  // Actions ============================================

  const handleClickNewRecipe = () => {

    setShowForm(true)
   
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        ingredients: [],
        instructions: []
    }))
  }

  const addIngredient = (formData) => {
    let newIngredient = {
        quantity: formData.get('quantity'), 
        unit: formData.get('unit'), 
        name: formData.get('name')
    };
    
    setRecipe(prevRecipe =>({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, newIngredient]
    }))

    console.log(recipe.ingredients)

  }

  const addStepToInstructions = () => {

  }

  return (
    <section className='p-4'>
      <h1 className='text-3xl'>Add a Recipe</h1>
        <br></br>
        { !showForm ?
            <button 
                className='ml-4 cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'
                onClick={handleClickNewRecipe}
                >
                    New Recipe
            </button> 
            :
            <section>
                <h1 className='text-2xl'>Add Ingredient:</h1>
                <br></br>
                <form action={addIngredient}>
                    <div className='flex flex-row'>
                        
                        <input className='border border-black p-1'
                        placeholder='Quantity'
                        type='text'
                        name='quantity'/>

                        <input className='border border-black p-1'
                        placeholder='Unit'
                        type='text'
                        name='unit'/>

                        <input className='border border-black p-1'
                        placeholder='Ingredient'
                        type='text'
                        name='name'/>
                    
                    </div>
                    <br></br>
                    <button>Add Ingredient</button>
                </form>
                <br></br>

                <h1 className='text-2xl'>Add Instruction Step:</h1>
                <br></br>
                <form action={addStepToInstructions}>
                    <div className='flex flex-row'>
                        
                        <textarea className='border border-black p-1 w-153'
                        
                        type='text'
                        name='step'/>
                    
                    </div>
                    <br></br>
                    <button>Add Step to Instructions</button>
                </form>

            </section>
        }
        <br></br>
        <br></br>
        { recipe.ingredients.length > 0 &&
           <>
            {ingredientsList()}
            <br></br>
            {instructionsList()}
           </>
        }
   
      
    </section>
  );
};

export default AddRecipe;
