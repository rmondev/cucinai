"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from '@/context/AuthContext'
import Button from '@/components/Button'
import GoogleButton from 'react-google-button'
import { persistRecipe } from '@/lib/db'
import { toast } from 'react-toastify';
import PageLoadAnimation from '@/components/PageLoadAnimation'

const AddRecipe = () => {
    // State ==========================================

    
    const {user, googleSignIn, loading} = UserAuth();
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
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          title: event.target.value
        }));
      };
      

    const addIngredient = (formData) => {
        

        console.log('Quantity: ' + formData.get('quantity'))
        if(formData.get('name') === ''){
            toast.error('Please include an ingredient name.')
            return
        } 

        if (isNaN(formData.get('quantity')) || formData.get('quantity') === '' || formData.get('quantity') === '0') {
            toast.error("Please enter a valid numeric quantity.");
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
          const safeTitle = recipe.title.trim() === '' ? 'No Title' : recipe.title;
      
          await persistRecipe(
            {
              ...recipe,
              title: safeTitle
            },
            user.uid
          );
      
          console.log('Recipe Added!');
          toast.success("Recipe added to your collection!");
      
          setRecipe({
            title: '',
            ingredients: [],
            instructions: []
          });
      
          setShowForm(false);
        } catch (error) {
          console.log(error);
          toast.error("Error saving recipe");
        }
    };
      
    return (
        <>
            {!loading ? (
                user ? (
                <>  
                    <section className='flex flex-col justify-center items-center'>
                        <div className='flex flex-row justify-center items-center
                            xl:m-10
                            lg:m-10
                            md:m-10
                            sm:m-5
                            m-5

                            xl:w-1/2                       
                            lg:w-1/2                   
                            md:w-11/12                              
                            sm:w-11/12
                            '
                            >
                                <h1 className="
                                    font-bold
                                    text-3xl
                                    sm:text-4xl
                                    md:text-4xl
                                    lg:text-5xl
                                    xl:text-6xl
                                    text-[#2f2648]
                                    "
                                    >
                                        Add Recipe
                                </h1>
                        </div>
                    <section 
                        className="
                        flex flex-col justify-center items-center w-full 
                        xl:justify-evenly xl:flex-row xl:items-start           
                        lg:justify-evenly lg:flex-row lg:items-start       
                        md:justify-evenly md:flex-row md:items-start md:w-full        
                        sm:justify-start sm:flex-col sm:items-center sm:w-full
                        "
                        >
                        <div 
                            className='
                            relative z-20
                            flex flex-col w-11/12 p-4 border-2 border-[#7249b8] rounded-lg bg-white     
                            xl:flex-col xl:w-1/2 xl:m-4 xl:p-4                            
                            lg:flex-col lg:w-1/2 lg:m-4 lg:p-4                       
                            md:flex-col md:w-11/12 md:m-4 md:p-4                                  
                            sm:flex-col sm:w-11/12 sm:m-4 sm:p-4'
                            >
                        
                            { !showForm ?
                                <Button title='New Recipe' onClick={handleClickNewRecipe}/>
                                :
                                <section className='pb-4'>
                                    <form className='flex flex-col ' action={addIngredient}>
                                        
                                        {/* Recipe Title Section */}
                                        <section className="border-2 border-[#2f2648] rounded-lg p-2">

                                            <label className='
                                                text-lg w-fit 
                                                sm:text-lg 
                                                md:text-xl 
                                                lg:text-2xl 
                                                xl:text-2xl
                                                text-[#2f2648]'
                                                >
                                                    Recipe Title
                                                </label>

                                            <input className='border border-[#2f2648] p-1 rounded w-full mb-2'
                                                placeholder='Title'
                                                type='text'
                                                name='title'
                                                value={recipe.title}
                                                onChange={handleRecipeTitleChange}/>
                                        </section>

                                        {/* Add Ingredient Section */}
                                        <section className='border-2 border-[#2f2648] rounded-lg p-2 mt-2'>

                                            <label className='
                                                text-lg w-fit
                                                sm:text-lg 
                                                md:text-xl 
                                                lg:text-2xl 
                                                xl:text-2xl
                                                text-[#2f2648]
                                                '
                                                >
                                                    Add Ingredient
                                                </label>
                                            
                                            <div className='flex flex-row gap-2 pb-4 mt-2'>
                                                
                                                <input 
                                                className='
                                                border border-black p-1 rounded w-full
                                                text-xs
                                                sm:text-md
                                                md:text-lg
                                                lg:text-xl
                                                xl:text-xl
                                                text-[#2f2648]
                                                '
                                                placeholder='Ingredient'
                                                type='text'
                                                name='name'/>

                                                <input 
                                                className='
                                                border border-black p-1 rounded w-full
                                                text-xs
                                                sm:text-md
                                                md:text-lg
                                                lg:text-xl
                                                xl:text-xl
                                                text-[#2f2648]
                                                '
                                                placeholder='Quantity'
                                                type='number'
                                                name='quantity'
                                                min='0'
                                                step='any'
                                                />

                                                <select 
                                                    className="
                                                    border border-black p-1 rounded w-full
                                                    text-xs
                                                    sm:text-md
                                                    md:text-lg
                                                    lg:text-xl
                                                    xl:text-xl
                                                    "
                                                    name="unit" 
                                                    defaultValue={''}
                                                    >
                                                <option value="" disabled placeholder='Unit'>
                                                    Unit
                                                </option>
                                                <optgroup label="Metric - Volume">
                                                    <option value="ml">Milliliter (ml)</option>
                                                    <option value="l">Liter (l)</option>
                                                </optgroup>
                                                <optgroup label="Metric - Weight">
                                                    <option value="g">Gram (g)</option>
                                                    <option value="kg">Kilogram (kg)</option>
                                                </optgroup>
                                                <optgroup label="Imperial - Volume">
                                                    <option value="tsp">Teaspoon (tsp)</option>
                                                    <option value="tbsp">Tablespoon (tbsp)</option>
                                                    <option value="fl oz">Fluid Ounce (fl oz)</option>
                                                    <option value="cup">Cup</option>
                                                    <option value="pt">Pint (pt)</option>
                                                    <option value="qt">Quart (qt)</option>
                                                    <option value="gal">Gallon (gal)</option>
                                                </optgroup>
                                                <optgroup label="Imperial - Weight">
                                                    <option value="oz">Ounce (oz)</option>
                                                    <option value="lb">Pound (lb)</option>
                                                </optgroup>
                                                </select>
                                                                                            
                                            </div>
                                        
                                            <div className="flex flex-row gap-2">
                                                <Button title={'Add Ingredient'}/>
                                                <Button title={'Remove Last Ingredient'} onClick={removeLastIngredient}/>
                                            </div>
                                        </section>
                                    </form>

                                    {/* Add Steps Section */}
                                    <form className='border-2 border-[#2f2648] rounded-lg p-2 mt-2'action={addStepToInstructions}>
                                    <label className='
                                        text-lg w-fit
                                        sm:text-lg 
                                        md:text-xl 
                                        lg:text-2xl 
                                        xl:text-2xl
                                        text-[#2f2648]
                                        '
                                        >
                                            Add Step
                                        </label>
                                        <div className='flex flex-row'>
                                            <textarea className='border border-[#2f2648] p-1 w-full rounded text-[#2f2648]'
                                            placeholder="Add a Step Here..."
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
                                        
                                            {/* Custom Button for Save To Firestore */}
                                            <button 
                                                className='
                                                cursor-pointer w-fit border-2 p-2 rounded-lg text-sm 
                                                border-[#2f2648]
                                                
                                                dark:text-[#2f2648]

                                                dark:hover:bg-[#2f2648]
                                                dark:hover:text-[#d5c4f1]

                                                transition-colors duration-400
                                                hover:bg-[#d5c4f1]
                                                hover:text-[#2f2648]
                                                text-[#2f2648]

                                                font-bold
                                                sm:text-sm 
                                                md:text-lg 
                                                lg:text-xl 
                                                xl:text-2xl
                                                disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-500 disabled:font-semibold'
                                                disabled={recipe.ingredients.length === 0 || recipe.instructions.length === 0}
                                                onClick={saveToFirestore}
                                            >
                                                Save Recipe
                                            </button>
                                        </div>
                                </section>
                            }
                        </div>

                        {/* Ingredient List Section */}
                        { recipe.ingredients.length > 0 &&
                        <section className="
                            relative z-20 w-11/12 mt-2 h-fit border-2 border-[#7249b8] rounded-lg p-4 mb-4 bg-white
                            sm:w-11/12 sm:mt-2 sm:h-fit 
                            md:w-11/12 md:m-4 md:h-fit
                            lg:w-1/2 lg:m-4 lg:h-fit
                            xl:w-1/2 xl:m-4 xl:p-4 xl:h-fit"
                            >
                            <section className="">
                                <h1 className='text-2xl border-b-2 border-[#7249b8] w-fit mb-4'>{recipe.title}</h1>

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
                    </section>
                </>
                ) : ( 
                <section className="flex flex-col justify-center items-center h-screen">
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className="text-xl">Please Sign In</p>
                        <GoogleButton
                            label={user? 'Log Out' : 'Sign in with Google'}
                            onClick={handleSignIn}
                        />
                    </div>
                </section>
                )
            ) : (
                <main className='flex justify-center items-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]'>
                    <PageLoadAnimation/>
                </main>
            )}
        </>
    );
};

export default AddRecipe;
