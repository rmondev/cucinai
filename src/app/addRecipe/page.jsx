"use client";
import React, { useEffect, useState } from "react";
import UserAuth from '../context/AuthContext'
import Button from '@/components/Button'

const AddRecipe = () => {
    // State ==========================================

    const [showForm, setShowForm] = useState(false)
    const [recipe, setRecipe] = useState({
        title: '',
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
                        <th className="w-50"></th>
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
            <p className='mb-2' key={index}>{step}</p>
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

  const handleRecipeTitleChange = (event) => {
    setRecipe(prevRecipe => ({...prevRecipe,
        title: event.target.value || 'No Title'
    }))
  }

  const addIngredient = (formData) => {
    let newIngredient = {
        quantity: formData.get('quantity'), 
        unit: formData.get('unit'), 
        name: formData.get('name')
    }
    
    setRecipe(prevRecipe =>({
        ...prevRecipe,
       ingredients: [...prevRecipe.ingredients, newIngredient]
    }))
  }

  const addStepToInstructions = (formData) => {
    let newStep = formData.get('step')
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        instructions: [...prevRecipe.instructions, `Step ${prevRecipe.instructions.length + 1}. ${newStep}`]
    }))
  }

  const removeLastStep = (event) => {
    event.preventDefault()
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        instructions: prevRecipe.instructions.slice(0, -1) 
    }));
  }

  const removeLastIngredient = (event) => {
    event.preventDefault()
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        ingredients: prevRecipe.ingredients.slice(0, -1) 
    }));
  }

  const saveToFirestore = () => {
    console.log(recipe)
  }


  return (
    <section className="flex       xl:justify-evenly xl:flex-row xl:items-start                  lg:justify-evenly lg:flex-row lg:items-start             md:justify-center md:items-center md:flex-col md:w-full             sm:justify-center sm:items-center sm:flex-col sm:w-full  justify-center items-center flex-col w-full">
        <div className='flex       xl:flex-col xl:w-1/2 xl:m-4 xl:p-4              lg:flex-col lg:w-1/2 lg:m-4 lg:p-4                                         md:flex-col md:w-1/2 md:p-4                                         sm:flex-col sm:w-1/2 sm:p-4             flex-col w-11/12 p-4                            border-2 border-black rounded-lg'>
        <h1 className='text-3xl border-b-2 mb-8'>Add a Recipe</h1>
           
            { !showForm ?
                <Button title='New Recipe' onClick={handleClickNewRecipe}/>
                :
                <section className='pb-4'>
                    <form className='flex flex-col pt-4' action={addIngredient}>
                        
                        {/* Recipe Title Section */}
                        <section className="border-2 border-black rounded-lg p-2">
                            <h1 className='text-2xl mb-2 border-b-2 border-black w-fit'>Recipe</h1>
                            <input className='border border-black p-1 rounded w-full mb-2'
                                placeholder='Title'
                                type='text'
                                name='title'
                                value={recipe.title}
                                onChange={handleRecipeTitleChange}/>
                        </section>

                        {/* Add Ingredient Section */}
                        <section className='border-2 border-black rounded-lg p-2 mt-2'>
                            <label className='text-2xl border-b-2 border-black w-fit'>Add Ingredient</label>
                            
                            <div className='flex flex-row gap-2 pb-4 mt-2'>
                                
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
                        
                            <div className="flex flex-row gap-2">
                                <Button title={'Add Ingredient'}/>
                                <Button title={'Remove Last Ingredient'} onClick={removeLastIngredient}/>
                            </div>
                        </section>
                    </form>

                    
                    {/* Add Steps Section */}
                    <form className='lg:pt-4 border-2 border-black rounded-lg p-2 mt-2'action={addStepToInstructions}>
                    <h1 className='text-2xl mb-2 border-b-2 border-black w-fit'>Add Step</h1>
                        <div className='flex flex-row'>
                            <textarea className='border border-black p-1 w-full rounded'
                            type='text'
                            name='step'/>
                        </div>


                        {/* Form-Instructions Button Container */}
                        <div className='flex flex-row gap-2 pt-4'>
                            <button className="cursor-pointer text-xs sm:text-md md:text-lg lg:text-xl xl:text-2xl w-fit border-2 border-black p-1 rounded-lg"
                                >
                                    Add Step
                            </button>
                            <button className='cursor-pointer text-xs sm:text-md md:text-lg lg:text-xl xl:text-2xl w-fit border-2 border-black p-1 rounded-lg'
                                onClick={removeLastStep}
                                >
                                Remove Last Step
                            </button>
                        </div>
                    </form>
                    { recipe.ingredients.length > 0 && recipe.instructions.length > 0 &&
                        <div className='flex          xl:mt-4 xl:justify-end xl:w-full                lg:justify-end lg:w-full lg:mt-4                     md:justify-end md:w-full md:mt-4  justify-end w-full mt-4'>
                            <Button title='Add Recipe' onClick={saveToFirestore}/>
                        </div>
                    }
                </section>
            }
            
           
        
        </div>

        {/* Ingredient List Section */}
        { recipe.ingredients.length > 0 &&
        <section className="xl:w-1/2 xl:h-fit                    lg:w-1/2 lg:h-fit                 md:w-1/2 md:mt-4 md:h-fit              sm:w-1/2 sm:mt-2 sm:h-fit     w-11/12 mt-2 h-fit     border-2 border-black rounded-lg p-4 mb-4">
            <section className="">
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
            </section>
        </section>
        }
    </section>
  );
};

export default AddRecipe;
