'use client'
import React, {useState, useEffect} from 'react'
import { listenToRecipes } from '@/lib/db'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import {getSillyRecipeFromMistral} from '@/lib/ai'
import ReactMarkdown from 'react-markdown'

const AIChef = () => {

    const { user, googleSignIn } = UserAuth()
    const [recipes, setRecipes] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(null)
    const [recipe, setRecipe] = useState(null)
    
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

    const testMinstrel = async () => {
      if (!selectedRecipe) return;
    
      try {
        const result = await getSillyRecipeFromMistral(selectedRecipe);
        setRecipe(result); // ✅ now a string, not a Promise
      } catch (err) {
        console.error("Error generating silly recipe:", err);
      }
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

            <section className='
              flex flex-row justify-between
              text-xs
              sm:text-md
              md:text-lg
              lg:text-xl
              xl:text-xl
              sm:w-3/4
              md:w-5/8
              lg:w-5/8
              xl:w-5/8
              m-4
              '
              >
              <button className='cursor-pointer border-2 rounded-xl p-2 border-blue-700 text-blue-700
              text-sm 
              transition-colors duration-400
              hover:bg-blue-700 hover:text-white
              sm:text-sm 
              md:text-lg 
              lg:text-xl 
              xl:text-2xl
              ' 
              onClick={testMinstrel}>Generate AI Recipe TEST</button>
              
              <button className='cursor-pointer border-2 rounded-xl p-2 border-green-700 text-green-700
              text-sm 
              transition-colors duration-400
              hover:bg-green-700 hover:text-white
              sm:text-sm 
              md:text-lg 
              lg:text-xl 
              xl:text-2xl
              ' 
              onClick={testMinstrel}>Generate AI Recipe TEST</button>
              
              <button className='cursor-pointer border-2 rounded-xl p-2 border-red-700 text-red-700
              text-sm 
              transition-colors duration-400
              hover:bg-red-700 hover:text-white
              sm:text-sm 
              md:text-lg 
              lg:text-xl 
              xl:text-2xl
              ' 
              onClick={testMinstrel}>Generate AI Recipe TEST</button>
            </section>


              <div className='w-1/2'>
                {recipe && 
                  <div className='text-start border-2 rounded-xl p-4
                  '>
                
                    <ReactMarkdown>{recipe}</ReactMarkdown> 
                  
                  </div>
                }
              </div>

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
