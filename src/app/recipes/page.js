'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth, googleSignIn, loading} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import { listenToRecipes, deleteRecipe } from '@/lib/db'
import Recipe from '@/components/Recipe'
import { toast } from 'react-toastify';
import PageLoadAnimation from '@/components/PageLoadAnimation'


const Recipes = () => {

  const { user, googleSignIn, loading } = UserAuth()
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
            <option disabled value=''>
              Select a Recipe...
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
      {!loading ? (
      user ? (
        <section className='flex flex-col w-full justify-center items-center text-center bg-[#b49ff3] dark:bg-[#d5c4f1]'>
          <header className='flex flex-row justify-start text-start
            w-11/12
            sm:w-3/4
            md:w-5/8
            lg:w-5/8
            xl:w-5/8
            mt-10
            mb-10
            '
            >
            <h1 className="
              font-bold
              text-3xl
              sm:text-4xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl
              "
              >
                My Recipes</h1>
          </header>
           
            
            {/* Recipe selection dropdown */}
            {recipeSelection()}
          

            <section className='
              flex flex-row justify-center w-full
              sm:flex-row sm:w-full
              md:flex-row md:w-full
              lg:flex-row lg:w-full
              xl:flex-row xl:w-full
              '>
                {/* Render Recipe component if a recipe has been selected */}
                {selectedRecipe ? (
                  <Recipe 
                    recipe={selectedRecipe} 
                    handleDelete={() => handleRecipeDelete(selectedRecipeId)} 
                  />
                  ) : (
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
                      Select a Recipe to View Its Details
                    </label>
                )}
            </section>
        </section>
      ) : ( 
      // No User, render Google login button
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
  )
}

export default Recipes
