'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import { getRecipes } from '@/lib/db'

const Recipes = () => {

  const { user, googleSignIn } = UserAuth()
  const [recipes, setRecipes] = useState([])
  
  useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const recipesData = await getRecipes("GKHiEonZO8T0BoANtlOUrjKIWXc2");
          setRecipes(recipesData);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };
  
      fetchRecipes();
    }, []);

  
    if (recipes.length > 0){
      console.log(recipes)
    }
  
  const handleSignIn = async () => {
      try {
        await googleSignIn()
      } catch (error) {
        console.log(error)
      } 
  };

  const handleSelection = () => {

  }

  const recipeSelection = () => (

    
      <form className='
        w-5/8
        sm:w-11/12
        md:w-11/12
        lg:w-11/12
        xl:w-1/2
        
      '
      
      action={handleSelection}>
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

      <section className='flex flex-col w-full justify-center items-center text-center h-screen'>
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
