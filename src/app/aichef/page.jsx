'use client'
import React, {useState, useEffect, useSyncExternalStore} from 'react'
import { listenToRecipes } from '@/lib/db'
import {UserAuth, googleSignIn} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import {getAIrecipe} from '@/lib/ai'
import ReactMarkdown from 'react-markdown'
import Recipe from '@/components/Recipe'
import AILoadingDialog from '@/components/AILoadingDialog'
import {toast} from 'react-toastify'

const AIChef = () => {

    const { user, googleSignIn } = UserAuth()
    const [recipes, setRecipes] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(null)
    const [recipe, setRecipe] = useState(null)
    const [recipeEnhancementOpts, setRecipeEnhancementOpts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
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
      const selectedId = e.target.value
      console.log(selectedId)
      setSelectedRecipeId(selectedId)
    
      // ✅ Clear enhancement options and current AI recipe
      setRecipeEnhancementOpts([])
      setRecipe(null)
    };

    const fetchSimilarRecipe = async () => {
      
    if (!selectedRecipe) return;
    setIsLoading(true)
    
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
        toast.error("There was an Error Generating AI Recipe. Please try again.");
      } finally {
        setIsLoading(false)
        toast.success("Success! AI Recipe Generated. Scroll Down to View!");
      }
    }

    const fetchEnhancedRecipe = async () => {
      if (!selectedRecipe || recipeEnhancementOpts.length === 0) return;
      setIsLoading(true)
  
    
    
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
        toast.error("There was an Error Generating AI Recipe. Please try again.");
      } finally {
        setIsLoading(false)
        toast.success("Success! AI Recipe Generated. Scroll Down to View!");
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
            border border-black p-1 rounded
            text-xs
            sm:text-md
            md:text-lg
            lg:text-xl
            xl:text-xl
            w-full
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

 

  const enhancementArr = ['Healthier', 
                          'High Protein', 
                          'Lower-Carb', 
                          'Vegan', 
                          'Gluten-Free', 
                          'Dessert-Like', 
                          'Dairy-Free', 
                          'Nut-Free', 
                          'Italian Twist', 
                          'Asian-Inspired', 
                          'Mexican Flair', 
                          'Simplify', 
                          'Faster to Prepare', 
                          'Kid-Friendly', 
                          'Fancy/Gourmet' 
                        ]


  const enhancementSelectionForm = () => (
    <form className='grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-[1px] w-full p-4'>
      {enhancementArr.map((criteria, index)=>
        <div key={index} 
              className='flex items-start text-start
                w-11/12
                sm:w-3/4
                md:w-5/8
                lg:w-5/8
                xl:w-5/8
            '>
          <input className='m-[0.6rem]'
                 onChange={handleCheckboxChange}
                 type="checkbox" 
                 name='enhancements' 
                 value={criteria}
                 checked={recipeEnhancementOpts.includes(criteria)}
            />
          <label>{criteria}</label>
        </div>
      )}
    </form>
  )
  return (
    <>
    {user ?
        <main className='flex flex-col w-full justify-center items-center text-center'>

          <header className='flex flex-row justify-start items-start text-start
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
                CucinAI Recipes</h1>
          </header>

            <section className="mt-10 mb-4">
              <p className="
                font-bold
                text-lg
                sm:text-xl
                md:text-xl
                lg:text-2xl
                xl:text-2xl
                "
                >
                  Choose a Recipe from Your Recipe Collection Below
                </p>
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
              <section className='flex flex-col border-2 border-black p-4 gap-2 w-full'>

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
                {enhancementSelectionForm()}
              </section>
            </section>


              <div className='flex flex-row justify-center items-center w-full
              sm:flex-row sm:w-full
              md:flex-row md:w-full
              lg:flex-row lg:w-full
              xl:flex-row xl:w-full
              '>
                {isLoading ? (
                  <AILoadingDialog/>
                  ) : recipe ? (
                  <Recipe recipe={recipe} recipeSetter={()=> setRecipe()} isAi />
                  ): (<h1>No Recipe</h1>)
                  
                  }


                {/* { recipe != null ? <Recipe recipe={recipe} recipeSetter={()=> setRecipe()} isAi /> : <h1>No Recipe</h1>} */}
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
