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


  
  return (
    <>
      {user ? 
      <div className='flex flex-col justify-center items-center h-screen'>
            Recipes
          </div>
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
