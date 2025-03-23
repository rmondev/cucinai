'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import { getRecipes } from '@/lib/db'
import Recipe from '@/components/Recipe'

const Recipes = () => {

  const { user, googleSignIn } = UserAuth()
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  
  useEffect(() => {
      const fetchRecipes = async () => {
        try {
          if (!user) return; // wait until user is available
          const recipesData = await getRecipes(user.uid);
          setRecipes(recipesData);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };
  
      fetchRecipes();
    }, [user]);

  
    // if (recipes.length > 0){
    //   console.log(recipes)
    // }
  
  const handleSignIn = async () => {
      try {
        await googleSignIn()
      } catch (error) {
        console.log(error)
      } 
  };


  const handleRecipeSelect = (e) => {
    setSelectedRecipe(recipes[e.target.value])
  }

 

  const recipeSelection = () => (

    
      <form className='
        w-5/8
        sm:w-11/12
        md:w-11/12
        lg:w-11/12
        xl:w-1/2
        
      '
      
      >
        <select 
          className="
          border border-black p-1 rounded w-full
          text-xs
          sm:text-md
          md:text-lg
          lg:text-xl
          xl:text-xl
          "
          name="recipeSelection" 
          defaultValue={''}
          onChange={handleRecipeSelect}
          >
              <option disabled placeholder='Select' value=''>
                Select 
                </option>
              {recipes.map((recipe, index) => (
                <option key={index} value={index} placeholder='Select Recipe'>
                    {recipe.title}
                </option>
              ))}

        </select>

    </form>
  
)
  
  return (
    <>
      {user ?

      <section className='flex flex-col w-full justify-center items-center text-center mt-20'>
        <label className='
        m-8
        w-11/12
        sm:w-11/12
        md:w-11/12
        lg:w-11/12
        xl:w-11/12
        text-sm
        sm:text-sm
        md:text-lg
        lg:text-2xl
        xl:text-2xl
        '>Select a Recipe from the Dropdown Below</label>
        {recipeSelection()}
      
        {selectedRecipe &&
        <Recipe recipe={selectedRecipe}/>
        }
      


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
