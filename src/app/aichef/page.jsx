'use client'
import React, {useState, useEffect, useSyncExternalStore, useRef} from 'react'
import { listenToRecipes } from '@/lib/db'
import {UserAuth} from '@/context/AuthContext'
import GoogleButton from 'react-google-button'
import Recipe from '@/components/Recipe'
import AILoadingDialog from '@/components/AILoadingDialog'
import {toast} from 'react-toastify'
import PageLoadAnimation from '@/components/PageLoadAnimation'

const AIChef = () => {

    const { user, googleSignIn, loading } = UserAuth()
    const [recipes, setRecipes] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(null)
    const [recipe, setRecipe] = useState(null)
    const [recipeEnhancementOpts, setRecipeEnhancementOpts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);
    const recipeSection = useRef(null)

    useEffect(()=>{
      if (recipe !== '' && recipeSection.current !== null)
        recipeSection.current.scrollIntoView({behavior: 'smooth'})
    }, [recipe])
    
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
            bg-white

            w-11/12
            sm:w-3/4
            md:w-3/4
            lg:w-3/4
            xl:w-3/4

            "
            name="recipeSelection" 
            defaultValue={''}
            onChange={handleRecipeSelect}
            >
              <option disabled value=''
                >
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

  const handleEnhancementButtonToggle = (enhancement) => {
    setRecipeEnhancementOpts((prevOpts) => {
      if (prevOpts.includes(enhancement)) {
        // Remove if already selected
        return prevOpts.filter((opt) => opt !== enhancement);
      } else {
        // Add if not selected
        return [...prevOpts, enhancement];
      }
    });
  };


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
                          'Prepare Faster', 
                          'Kid-Friendly', 
                          'Fancy/Gourmet' 
                        ]




  const enhancementSelectionButtons = () => {
   return (
    <section className='grid grid-cols-3 
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cold-5
      gap-x-4
      gap-y-[1px] 
      w-full 
      p-2
      
      sm:p-2
      md:p-4
      lg:p-4
      xl:p-4
      text-start'>
      {enhancementArr.map((enhancement) => <button key={enhancement} className={`cursor-pointer border border-black rounded-md p-1 m-1 
        ${recipeEnhancementOpts.includes(enhancement) ? 'bg-[#2f2648] ' : 'bg-white '}
        ${recipeEnhancementOpts.includes(enhancement) ? 'text-white ' : 'text-black '}
        ${recipeEnhancementOpts.includes(enhancement) ? 'border-[#d5c4f1]' : 'border-black'}
        `} onClick={() => handleEnhancementButtonToggle(enhancement)}>{enhancement}</button>
      )}
    </section>
   )
  }


  return (
    <>
     {!loading ? (
        user ? (
            <main className='relative z-20 flex flex-col w-full justify-center items-center text-center'>
              <header className='flex flex-row justify-start items-start text-start
                w-11/12
                sm:w-3/4
                md:w-3/4
                lg:w-3/4
                xl:w-3/4
                mt-4
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
                    Generate AI Recipe</h1>
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
                    1. Choose a recipe from your recipe collection below:
                    </p>
                </section>  
                
                  {recipeSelection()}

                  <section className="mt-6 mb-2">
                    <p className="font-bold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl m-4">
                      2. Choose what you want CucinAI to do with your recipe:
                    </p>

                    <div className="m-4">
                      <p className="mb-2">🔹 Generate a similar recipe with minimal changes:</p>
                      <button className='cursor-pointer border-2 rounded-xl p-2 border-blue-700 text-blue-700 bg-white
                        text-sm transition-colors duration-400 hover:bg-blue-700 hover:text-white
                        sm:text-sm md:text-lg lg:text-xl xl:text-2xl mb-6'
                        onClick={fetchSimilarRecipe}>
                          Generate Similar Recipe
                      </button>

                      <p className="mb-2">🔹 Or select enhancement options below for a more creative twist!</p>
                      <p className="italic text-sm text-gray-600">(e.g. make it Vegan, Healthier, or give it a Mexican flair)</p>
                    </div>
                  </section>


                <section className='
                  flex flex-col justify-center items-center
                  text-xs
                  sm:text-md
                  md:text-lg
                  lg:text-xl
                  xl:text-xl
                  w-11/12
                  sm:w-3/4
                  md:w-3/4
                  lg:w-3/4
                  xl:w-3/4
                  m-4
                  '
                  >

                  {/* Enhancement Selection Section */}
                  <section className='
                    flex 
                    flex-col 
                    gap-2
                    w-full'>
                    <section className='flex flex-col'>
                      <label>For Generating an Enhanced recipe, select the options below: </label>
              
                    {enhancementSelectionButtons()}
                    </section>

                    {/* Button Container */}
                    <div className='flex flex-row justify-center items-center gap-10'>
                      

                      <button className='cursor-pointer border-2 rounded-xl p-2 border-green-700 text-green-700 bg-white
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
                  </section>
                </section>


                  <div ref={recipeSection} className='flex flex-row justify-center items-center w-full
                  sm:flex-row sm:w-full
                  md:flex-row md:w-full
                  lg:flex-row lg:w-full
                  xl:flex-row xl:w-full
                  '>
                    {isLoading ? (
                      <AILoadingDialog/>
                      ) : recipe ? (
                      <Recipe recipe={recipe} recipeSetter={()=> setRecipe()} isAi />
                      ) : (
                        <h1>No Recipe Generated</h1>
                      )
                      }
                  </div>

            </main>
        ):(
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

export default AIChef
