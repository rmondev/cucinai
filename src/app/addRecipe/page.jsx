"use client";
import React, { useEffect, useState } from "react";
import UserAuth from '../context/AuthContext'
import Button from '@/components/Button'

const AddRecipe = () => {
    // State ==========================================

    const [showForm, setShowForm] = useState(false)
    const [recipe, setRecipe] = useState({
        title: null,
        ingredients: [],
        instructions: []
    });

    



  // Elements ==========================================
  const ingredientsList = () => (
    recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="flex flex-row mb-2">

            <table className='w-fit'>
                <tbody >
                    <tr>
                        <th className="w-15"></th>
                        <th className="w-25"></th>
                        <th className="w-25"></th>
                    </tr>
                    <tr>
                        <td className='items-start'>{ingredient.quantity}</td>
                        <td className='items-start'>{ingredient.unit}</td>
                        <td className='items-start'>{ingredient.name}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    ))
   );

  const instructionsList = () => (
        recipe.instructions.map((step, index) => (
            <p className='mb-2'key={index}>{step}</p>
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
    let title = formData.get('title') === '' ? 'No Title' : formData.get('title')
    
    setRecipe(prevRecipe =>({
        ...prevRecipe,
        title: title, ingredients: [...prevRecipe.ingredients, newIngredient]
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

  const removeLastStep = (event) => {
    event.preventDefault()
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        instructions: prevRecipe.instructions.slice(0, -1) // ✅ Removes last step
    }));
  }


  return (
    <section className="flex justify-center items-center w-full">
        <div className='p-4 border-2 border-black rounded-lg w-1/2'>
        <h1 className='text-3xl border-b-2 mb-8'>Add a Recipe</h1>
           
            { !showForm ?
                <Button title='New Recipe' onClick={handleClickNewRecipe}/>
                :
                <section className='pb-4'>
                    <form className='flex flex-col pt-4' action={addIngredient}>
                        <h1 className='text-2xl mb-2 border-b-2 border-black w-fit'>Recipe</h1>
                        <input className='border border-black p-1 rounded w-full mb-2'
                            placeholder='Title'
                            type='text'
                            name='title'/>

                        <h1 className='text-2xl mb-2 border-b-2 border-black w-fit'>Add Ingredient</h1>
                   
                        <div className='flex flex-row gap-2 pb-4'>
                            <input className='border border-black p-1 rounded w-full'
                            placeholder='Quantity'
                            type='text'
                            name='quantity'/>
                            <input className='border border-black p-1 rounded w-full'
                            placeholder='Unit'
                            type='text'
                            name='unit'/>
                            <input className='border border-black p-1 rounded w-full'
                            placeholder='Ingredient'
                            type='text'
                            name='name'/>
                        </div>
                        
                        <button className="cursor-pointer md:text-lg lg:text-xl xl:text-2xl w-fit border-2 border-black p-1 rounded-lg"
                            >Add Ingredient
                        </button>
                    </form>
                    

                    
                    
                    {/* Form-Instructions */}
                    <form className='pt-4'action={addStepToInstructions}>
                    <h1 className='text-2xl mb-2 border-b-2 border-black w-fit'>Add Instruction Step</h1>
                        <div className='flex flex-row'>
                            <textarea className='border border-black p-1 w-full rounded'
                            type='text'
                            name='step'/>
                        </div>


                        {/* Form-Instructions Button Container */}
                        <div className='flex flex-row gap-2 pt-4'>
                            <button className="cursor-pointer md:text-lg lg:text-xl xl:text-2xl w-fit border-2 border-black p-1 rounded-lg"
                                >Add Step
                            </button>
                            <button className='cursor-pointer md:text-lg lg:text-xl xl:text-2xl w-fit border-2 border-black p-1 rounded-lg'
                            onClick={removeLastStep}
                            >
                                Remove Last Step
                            </button>
                        </div>
                    </form>
                </section>
            }
            <br></br>
            <br></br>
            { recipe.ingredients.length > 0 &&
            <>
                <h1 className='text-2xl border-b-2 w-fit mb-4'>{recipe.title}</h1>

                {recipe.ingredients.length > 0 ?
                <div>
                    <h2 className='text-xl border-b-2 w-fit mb-4'>Ingredients</h2>
                    {ingredientsList()}
                </div>
                
                : null}
                

                {recipe.instructions.length > 0 ?
                    <div className='mt-4'>
                    <h2 className='text-xl border-b-2 w-fit mb-4'>Instructions</h2>
                    {instructionsList()}
                    </div>
                : null}
            </>
            }
    
        
        </div>
    </section>
  );
};

export default AddRecipe;
