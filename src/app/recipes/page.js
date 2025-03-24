'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import { getRecipes, listenToRecipes, deleteRecipe } from '@/lib/db'
import Recipe from '@/components/Recipe'
import { ToastContainer, toast } from 'react-toastify';


const Recipes = () => {

  const { user, googleSignIn } = UserAuth()
  const [recipes, setRecipes] = useState([])
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);

  useEffect(() => {
    if (!recipes.find((r) => r.id === selectedRecipeId)) {
      setSelectedRecipeId(null);
    }
  }, [recipes, selectedRecipeId]);
  

  
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = listenToRecipes(user.uid, setRecipes);

    return () => unsubscribe(); // Clean up on unmount
  }, [user?.uid]);

  
  const handleSignIn = async () => {
      try {
        await googleSignIn()
      } catch (error) {
        console.log(error)
      } 
  };

  const handleRecipeSelect = (e) => {
    setSelectedRecipeId(e.target.value);
  };

  const handleRecipeDelete = async (recipeId) => {
    try {
      await deleteRecipe(user.uid, recipeId);
      toast.success("Recipe deleted from your collection!");
  
      // Clear selectedRecipeId if the deleted recipe is the one selected
      if (selectedRecipeId === recipeId) {
        setSelectedRecipeId(null);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe from your collection.");
    }
  };
  

  const recipeSelection = () => (

    
      <form className='
        w-full
        sm:w-full
        md:w-full
        lg:w-full
        xl:w-full
        
      '
      
      >
        <select 
          className="
          border border-black p-1 rounded w-11/12
          text-xs
          sm:text-md
          md:text-lg
          lg:text-xl
          xl:text-xl
          
          
          sm:w-3/4
          md:w-5/8
          lg:w-5/8
          xl:w-5/8
          
          
          "
          name="recipeSelection" 
          defaultValue={''}
          onChange={handleRecipeSelect}
          >
              <option disabled placeholder='Select' value=''>
                Select 
                </option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id} placeholder='Select Recipe'>
                    {recipe.title}
                </option>
              ))}

        </select>

    </form>
  
)
  
  return (
    <>
      {user ?

      <section className='
        flex flex-col w-full justify-center items-center text-center mt-20'>

        {!selectedRecipe &&
          <label className='
          m-8
          w-11/12
          sm:w-5/8
          md:w-5/8
          lg:w-5/8
          xl:w-5/8

          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-2xl
          xl:text-2xl
          '>
            Select a Recipe from the Dropdown Below
          </label>
        }
        {recipeSelection()}
        

        <section className='
          flex flex-row justify-between
          sm:flex-row 
          md:flex-row
          lg:flex-row 
          xl:flex-row
          '>
          
          {selectedRecipe ?
          <div className='
          border border-r-2 border-t-2 border-b-2 
          rounded-r-2xl rounded-t-2xl rounded-b-2xl rounded-l-none rounded-bl-none rounded-tl-none
          p-2 mr-2
          xl:h-120 xl:w-40 xl:mt-5
          lg:h-120 lg:w-40 lg:mt-5
          md:h-120 md:w-40 md:mt-3
          '
            >
              <label className='border-b-2 pb-2'>Similar Options</label>
            <ul className='
              flex flex-col justify-evenly items-center h-full
              '>
                <li className='p-4 w-30 border-black border-2 rounded-full'>Item 1</li>
                <li className='p-4 w-30 border-black border-2 rounded-full'>Item 2</li>
                <li className='p-4 w-30 border-black border-2 rounded-full'>Item 3</li>
                <li className='p-4 w-30 border-black border-2 rounded-full'>Item 4</li>

            </ul>
          </div>
          : null
          }

          {selectedRecipe ? (
            <Recipe 
              recipe={selectedRecipe} 
              handleDelete={() => handleRecipeDelete(selectedRecipeId)} 
            />
          ) : (
            <p className="text-gray-500">Select a recipe to view details</p>
          )}

          {selectedRecipe ?
          <div className='
          border border-l-2 border-t-2 border-b-2 
          rounded-l-2xl rounded-t-2xl rounded-b-2xl rounded-r-none rounded-br-none rounded-tl-2xl
          pt-2 ml-2
          xl:h-120 xl:w-40 xl:mt-5
          lg:h-120 lg:w-40 lg:mt-5
          md:h-120 md:w-40 md:mt-3
          
          '>
            <label className='border-b-2 pb-2'>Enhance Options</label>
          <ul className='
            flex flex-col justify-evenly items-center h-full
            '>
              <li className='p-4 w-30 border-black border-2 rounded-full'>Item 1</li>
              <li className='p-4 w-30 border-black border-2 rounded-full'>Item 2</li>
              <li className='p-4 w-30 border-black border-2 rounded-full'>Item 3</li>
              <li className='p-4 w-30 border-black border-2 rounded-full'>Item 4</li>

          </ul>
          </div>
          : null
          }

        </section>
      
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

      </section>



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
  )
}

export default Recipes
