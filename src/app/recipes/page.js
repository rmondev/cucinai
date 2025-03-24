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
          flex flex-col
          sm:flex-col 
          md:flex-row
          lg:flex-row
          xl:flex-row justify-between
          '>
          
          {selectedRecipe ?
          <div className='
          border border-r-2 border-t-2 border-b-2 rounded-r-2xl rounded-t-2xl rounded-b-2xl rounded-l-none rounded-bl-none rounded-tl-none
            xl:h-120 xl:w-30 xl:mt-5
          lg:h-120 lg:w-30 lg:mt-5
          md:h-120 md:w-30 md:mt-3
          '
            >Text Here
            </div>
          : null
          }

          {selectedRecipe ?
          <Recipe recipe={selectedRecipe}/>
          : null
          }

          {selectedRecipe ?
          <div className='
            border border-l-2 border-t-2 border-b-2 rounded-l-2xl rounded-t-2xl rounded-b-2xl rounded-r-none rounded-br-none rounded-tl-2xl
          xl:h-120 xl:w-30 xl:mt-5
          lg:h-120 lg:w-30 lg:mt-5
          md:h-120 md:w-30 md:mt-3
          
          '>
            Text Here</div>
          : null
          }

        </section>
      


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
