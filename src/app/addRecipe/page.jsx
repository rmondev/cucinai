"use client";
import React, { useEffect, useState } from "react";
import UserAuth from '../context/AuthContext'

const AddRecipe = () => {
    // State ==========================================

    const [showForm, setShowForm] = useState(false)
    const [recipe, setRecipe] = useState({
        ingredients: [],
        instructions: []
    });

    



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

  const addStepToInstructions = (formData) => {
    let newStep = formData.get('step')

    setRecipe(prevRecipe => ({
        ...prevRecipe,
        instructions: [...prevRecipe.instructions, `${prevRecipe.instructions.length + 1}. ${newStep}`]
    }))
  }

  const removeLastStep = () => {
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        instructions: prevRecipe.instructions.slice(0, -1) // ✅ Removes last step
    }));
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
                    <div className='flex flex-row gap-2'>
                        
                        <input className='border border-black p-1 rounded'
                        placeholder='Quantity'
                        type='text'
                        name='quantity'/>

                        <input className='border border-black p-1 rounded'
                        placeholder='Unit'
                        type='text'
                        name='unit'/>

                        <input className='border border-black p-1 rounded'
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
                        
                        <textarea className='border border-black p-1 w-153 rounded'
                        
                        type='text'
                        name='step'/>
                    
                    </div>
                    <br></br>
                    <button>Add Step</button>
                </form>
                <button onClick={removeLastStep}>Remove Last Step</button>
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
