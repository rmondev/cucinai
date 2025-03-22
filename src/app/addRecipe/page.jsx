"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from '../context/AuthContext'
import Button from '@/components/Button'
import GoogleButton from 'react-google-button'
import { persistRecipe } from '@/lib/db'
import { ToastContainer, toast } from 'react-toastify';

const AddRecipe = () => {
    // State ==========================================

    const {user, googleSignIn} = UserAuth();
    const [showForm, setShowForm] = useState(false)
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        instructions: []
    });
    

    const handleSignIn = async () => {
        try {
          await googleSignIn()
        } catch (error) {
          console.log(error)
        }
    };

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
                <div key={index}className='mb-2'>
                    <p className='font-semibold'>Step {index + 1}</p>
                    <p>{step}</p>
                </div>
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
        
        if(formData.get('quantity') === '' || formData.get('name') === ''){
            toast.info('Please include an ingredient name and quantity.')
            return
        }

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

        if(formData.get('step') === ''){
            toast.info('An empty Step cannot be added. Please type Step text.')
            return
        }
        let newStep = formData.get('step')
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            instructions: [...prevRecipe.instructions, newStep]
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

    const saveToFirestore = async () => {
        try {
            persistRecipe(recipe, user.uid)
            console.log('Recipe Added!')
            toast.success("Recipe added to your collection!")
            
            setRecipe({
                title: '',
                ingredients: [],
                instructions: []
              });

            setShowForm(false)
        } catch (error) {
            console.log(error)
            toast.log(error)
        }
    }

    return (
        <>
            {user ? 

                <>
                <section 
                    className="
                    flex justify-center items-center flex-col w-full 
                    xl:justify-evenly xl:flex-row xl:items-start                  
                    lg:justify-evenly lg:flex-row lg:items-start             
                    md:justify-center md:flex-col md:items-center md:w-full             
                    sm:justify-center sm:flex-col sm:items-center sm:w-full"
                    >
                    <div 
                        className='
                        flex flex-col w-11/12 p-4 border-2 border-black rounded-lg      
                        xl:flex-col xl:w-1/2 xl:m-4 xl:p-4                            
                        lg:flex-col lg:w-1/2 lg:m-4 lg:p-4                       
                        md:flex-col md:w-11/12 md:m-4 md:p-4                                  
                        sm:flex-col sm:w-11/12 sm:m-4 sm:p-4'
                        >
                        
                    <h1 className='
                        text-lg border-b-2 mb-4
                        sm:text-lg 
                        md:text-xl 
                        lg:text-2xl 
                        xl:text-2xl'
                        >
                            Add a Recipe
                            </h1>
                    
                        { !showForm ?
                            <Button title='New Recipe' onClick={handleClickNewRecipe}/>
                            :
                            <section className='pb-4'>
                                <form className='flex flex-col ' action={addIngredient}>
                                    
                                    {/* Recipe Title Section */}
                                    <section className="border-2 border-black rounded-lg p-2">

                                        <label className='
                                            text-lg w-fit 
                                            sm:text-lg 
                                            md:text-xl 
                                            lg:text-2xl 
                                            xl:text-2xl'
                                            >
                                                Recipe Title
                                            </label>

                                        <input className='border border-black p-1 rounded w-full mb-2'
                                            placeholder='Title'
                                            type='text'
                                            name='title'
                                            value={recipe.title}
                                            onChange={handleRecipeTitleChange}/>
                                    </section>

                                    {/* Add Ingredient Section */}
                                    <section className='border-2 border-black rounded-lg p-2 mt-2'>

                                        <label className='
                                            text-lg w-fit
                                            sm:text-lg 
                                            md:text-xl 
                                            lg:text-2xl 
                                            xl:text-2xl'
                                            >
                                                Add Ingredient
                                            </label>
                                        
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
                                <label className='
                                    text-lg  w-fit
                                    sm:text-lg 
                                    md:text-xl 
                                    lg:text-2xl 
                                    xl:text-2xl'
                                    >
                                        Add Step
                                    </label>
                                    <div className='flex flex-row'>
                                        <textarea className='border border-black p-1 w-full rounded'
                                        type='text'
                                        name='step'/>
                                    </div>

                                    {/* Form-Instructions Button Container */}
                                    <div className='flex flex-row gap-2 pt-4'>
                                        <Button title='Add Step'/>
                                        <Button title='Remove Last Step'onClick={removeLastStep}/>
                                    </div>
                                </form>
                                
                                    <div className='
                                        flex justify-end w-full mt-4
                                        sm:justify-end sm:w-full sm:mt-4
                                        md:justify-end md:w-full md:mt-4
                                        lg:justify-end lg:w-full lg:mt-4
                                        xl:justify-end xl:w-full xl:mt-4'
                                        >
                                        { recipe.ingredients.length > 0 && recipe.instructions.length > 0 &&
                                        <Button title='Add Recipe' onClick={saveToFirestore}/>
                                        }
                                    </div>
                                
                            </section>
                        }
                    </div>

                    {/* Ingredient List Section */}
                    { recipe.ingredients.length > 0 &&
                    <section className="
                        w-11/12 mt-2 h-fit border-2 border-black rounded-lg p-4 mb-4
                        sm:w-11/12 sm:mt-2 sm:h-fit 
                        md:w-11/12 md:h-fit
                        lg:w-1/2 lg:m-4 lg:h-fit
                        xl:w-1/2 xl:m-4 xl:p-4 xl:h-fit"
                        >
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
                <div className='m-12'>
                <ToastContainer 
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    // theme="light"
                />
                </div>

                </>
            : 
            <section className="flex flex-col justify-center items-center h-screen">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <p className="text-xl">Please Sign In</p>
                    <GoogleButton
                        label={user? 'Log Out' : 'Sign in with Google'}
                        onClick={handleSignIn}
                    />
                </div>
            </section>
            }
        </>
    );
};

export default AddRecipe;
