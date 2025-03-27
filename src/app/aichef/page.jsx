'use client'
import React, {useState, useEffect} from 'react'
import { listenToRecipes } from '@/lib/db'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import {getAIrecipe} from '@/lib/ai'
import ReactMarkdown from 'react-markdown'
import Recipe from '@/components/Recipe'

const AIChef = () => {

    const { user, googleSignIn } = UserAuth()
    const [recipes, setRecipes] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(null)
    const [recipe, setRecipe] = useState(null)
    const [recipeEnhancementOpts, setRecipeEnhancementOpts] = useState([])
    
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

    const fetchSimilarRecipe = async () => {
      
      if (!selectedRecipe) return;
  
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe: selectedRecipe,
          hasOptions: false
        })
      });
  
      const data = await res.json();

      console.log(data)
      setRecipe(data);

      
    } catch (err) {
      console.error('Error fetching AI recipe:', err);
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

  useEffect(() => {
    console.log('Enhancement Options (updated):', recipeEnhancementOpts);
  }, [recipeEnhancementOpts]);

  const handleCheckboxChange= (e) => {
    const { value, checked } = e.target

    setRecipeEnhancementOpts((prevOpts) => {
      if(checked){
        return [...prevOpts, value]
      } else {
        return prevOpts.filter((option) => option !== value)
      }
    })
  }

  const fetchEnhancedRecipe = async () => {
    if (!selectedRecipe || recipeEnhancementOpts.length === 0) return;

  
  
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe: selectedRecipe,
          hasOptions: true,
          options: recipeEnhancementOpts
        })
      });
  
      const data = await res.json();

      console.log(data)
      setRecipe(data);


    } catch (err) {
      console.error('Error fetching AI recipe:', err);
    }

    
  };

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
              flex flex-col justify-center items-center
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
              <section className='flex flex-col border-2 border-black p-4 gap-2'>

                <div className='flex flex-row justify-between items-center gap-10'>
                  <button className='cursor-pointer border-2 rounded-xl p-2 border-blue-700 text-blue-700
                    text-sm 
                    transition-colors duration-400
                    hover:bg-blue-700 hover:text-white
                    sm:text-sm 
                    md:text-lg 
                    lg:text-xl 
                    xl:text-2xl
                    ' 
                    onClick={fetchSimilarRecipe}
                      >
                        Generate Similar Recipe
                  </button>

                  <button className='cursor-pointer border-2 rounded-xl p-2 border-green-700 text-green-700
                      text-sm 
                      transition-colors duration-400
                      hover:bg-green-700 hover:text-white
                      sm:text-sm 
                      md:text-lg 
                      lg:text-xl 
                      xl:text-2xl
                      ' 
                      onClick={fetchEnhancedRecipe}
                        >
                          Generate an Enhanced Recipe
                  </button>
                </div>
                <label>For Generating an Enhanced recipe, select the options below: </label>
                <form className=' flex flex-row p-4 justify-start items-start w-full'>
                  
                  
                  <div className='flex justify-start items-start w-full'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Healthier'></input>
                    <label>Healthier</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='High Protein'></input>
                    <label>High-Protein</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Lower-Carb'></input>
                    <label>Lower-Carb</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Vegan'></input>
                    <label>Vegan</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Gluten-Free'></input>
                    <label>Gluten-Free</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Dessert-Like'></input>
                    <label>Dessert-Like</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Dairy-Free'></input>
                    <label>Dairy-Free</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Nut-Free'></input>
                    <label>Nut-Free</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Give it an Italian Twist'></input>
                    <label>Give it an Italian Twist</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Make it Asian-Inspired'></input>
                    <label>Make it Asian-Inspired'Twist</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Add a Mexican Flair'></input>
                    <label>Add a Mexican Flair</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Simplify the Recipe'></input>
                    <label>Simplify the Recipe</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Make it Faster to Prepare'></input>
                    <label>Make it Faster to Prepare</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Make it Kid-Friendly'></input>
                    <label>Make it Kid-Friendly</label>
                  </div>

                  <div className='flex justify-start items-start'>
                    <input className='m-[0.4rem]' onChange={handleCheckboxChange}type="checkbox" name='enhancements' value='Make it Fancy/Gourmet'></input>
                    <label>Make it Fancy/Gourmet</label>
                  </div>




                  {/* <div>
                    <button onClick={fetchEnhancedRecipe}>Submit</button>
                  </div> */}
                   





                </form>
                {/* <div className='flex flex-col justify-between items-center gap-10'>
                  <button className='cursor-pointer border-2 rounded-xl p-2 border-blue-700 text-blue-700
                    text-sm 
                    transition-colors duration-400
                    hover:bg-blue-700 hover:text-white
                    sm:text-sm 
                    md:text-lg 
                    lg:text-xl 
                    xl:text-2xl
                    ' 
                    onClick={fetchSimilarRecipe}
                      >
                        Generate Similar Recipe
                  </button>
                  
                  <button className='cursor-pointer border-2 rounded-xl p-2 border-green-700 text-green-700
                    text-sm 
                    transition-colors duration-400
                    hover:bg-green-700 hover:text-white
                    sm:text-sm 
                    md:text-lg 
                    lg:text-xl 
                    xl:text-2xl
                    ' 
                    onClick={fetchSimilarRecipe}
                      >
                        Generate AI Recipe TEST
                  </button>
                </div> */}

              </section>
              
            </section>


              <div className='flex flex-row justify-center items-center w-full
              sm:flex-row sm:w-full
              md:flex-row md:w-full
              lg:flex-row lg:w-full
              xl:flex-row xl:w-full
              '>
                { recipe != null ? <Recipe recipe={recipe} isAi /> : <h1>No Recipe</h1>}
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
