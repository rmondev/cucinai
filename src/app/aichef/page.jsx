'use client'
import React, {useState, useEffect} from 'react'
import { listenToRecipes } from '@/lib/db'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import {getRecipeFromMistral} from '@/lib/ai'

const AIChef = () => {

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
        console.log(e.target.value)
        setSelectedRecipeId(e.target.value);
    };

    const testMinstrel = () => {
      
    }

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
    {user ?
        <main className='
          flex flex-col w-full justify-center items-center text-center'>

            <section className="mt-10 mb-4 ">
              <h1 className="
                font-bold
                text-3xl
                sm:text-3xl
                md:text-3xl
                lg:text-4xl
                xl:text-4xl
                "
                >
                  AI Chef Recipes
                </h1>
            </section>  
            
            {recipeSelection()}

            <button onClick={testMinstrel}></button>
        </main>

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

export default AIChef
