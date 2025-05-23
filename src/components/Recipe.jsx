import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { persistRecipe } from '@/lib/db';
import { UserAuth } from '@/context/AuthContext';



const Recipe = (props) => {

    const {user} = UserAuth();

    const [isModalShown, setIsModalShown] = useState(false)

    const ingredientsList = () => (
        props.recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex flex-row mb-2">
                <table className='w-fit'>
                    <tbody >
                        <tr>
                            <th className="w-20"></th>
                            <th className="w-25"></th>
                            <th className="w-40"></th>
                        </tr>
                        <tr>
                            <td className='text-start'>{ingredient.quantity ?? ''}</td>
                            <td className='text-start'>{ingredient.unit ?? ''}</td>
                            <td className='text-start'>{ingredient.name ?? ''}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        ))
    );

    const instructionsList = () => (
        props.recipe.instructions.map((step, index) => (
            <div key={index} className='mb-2 flex flex-col justify-start'>
                <p className='font-semibold text-start'>Step {index + 1}</p>
                <p className='text-start'>{step}</p>
            </div>
        ))
    );


    const saveToFirestore = async () => {
            try {
              const safeTitle = props.recipe.title.trim() === '' ? 'No Title' : props.recipe.title;
          
              await persistRecipe(
                {
                  ...props.recipe,
                  title: safeTitle
                },
                user.uid
              );
              console.log('Recipe Added!');
              toast.success("Recipe added to your collection!");
              props.recipeSetter(null)
            } catch (error) {
              console.log(error);
              toast.error("Error saving recipe");
            }
        };
    
  return (
    <>
        { props.recipe.ingredients.length > 0 &&
        <section className="
            bg-white z-20 relative
            w-11/12 mt-2 h-fit border-2 border-black rounded-lg p-4 mb-4
            sm:w-3/4 sm:mt-2 sm:h-fit 
            md:w-5/8 md:h-fit
            lg:w-5/8 lg:m-4 lg:h-fit
            xl:w-5/8 xl:m-4 xl:p-4 xl:h-fit"
            >
            <section className="">
                <div className='flex flex-row justify-between text-start'>
                    <h1 className='
                        text-start
                        text-xl 
                        border-b-2
                        xl:mb-8
                        lg:mb-8
                        md:mb-6
                        sm:mb-6
                        mb-4
                        '
                    >
                        {props.recipe.title}
                    </h1>

                    {props.handleDelete &&
                        <button className='
                            cursor-pointer
                            transition-colors duration-400
                            hover:bg-red-600 hover:text-white
                            text-red-600
                            border-2 rounded-2xl
                            xl:text-xl
                            lg:text-xl
                            md:text-lg
                            sm:text-lg
                            text-xs
                            
                            xl:h-20 xl:p-4
                            lg:h-20 lg:p-4
                            md:h-15 md:p-4
                            sm:h-15 sm:p-4
                            h-15 p-4
                            '
                        onClick={()=>setIsModalShown(true)}
                        >
                            Delete
                        </button>
                    }

                    {props.isAi && 
                    <button className='
                    cursor-pointer
                    transition-colors duration-400
                        hover:bg-red-600 hover:text-white
                    text-red-600
                    p-2 border-2 rounded-2xl
                    xl:text-xl

                    '
                    onClick={saveToFirestore}
                    >
                        Save
                    </button>
                    }
                </div>

                {props.recipe.ingredients.length > 0 ?
                <div className='flex flex-col items-start'>
                    <h2 className='text-xl border-b-2 w-fit mb-4'>Ingredients</h2>
                    {ingredientsList()}
                </div>
                : null
                }
                
                {props.recipe.instructions.length > 0 ?
                    <div className='mt-4 flex flex-col justify-start items-start'>
                        <h2 className='text-xl border-b-2 w-fit mb-4'>Instructions</h2>
                        {instructionsList()}
                    </div>
                : null
                }
            </section>

            <dialog

            // Lilac [#d5c4f1]
            // Purple [#2f2648]
                open={isModalShown}
                className="
                fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                z-50 border border-stone-700 bg-white rounded pb-[4px]
                "
            > 
                <div className='text-start pl-[8px] pt-[4px] h-[30px] bg-gradient-to-b from-[#2f2648] to-[#d5c4f1]'>
                    <h1 className='text-sm text-white'>Delete Recipe</h1>
                </div>

                <div className='p-4'>
                    <p className='text-xs text-stone-700'>Are you sure you want to Delete this Recipe?</p>
                
                </div>

                <div className='flex flex-row justify-center h-[30px] p-[2px] gap-4 '>
                <button className='
                    cursor-pointer
                    border border-stone-700 
                    rounded ml-4 w-full text-xs 
                    transition-colors duration-200
                    hover:bg-gradient-to-t hover:from-[#d5c4f1] hover:to-[#2f2648]
                    text-white bg-gradient-to-t from-[#2f2648] to-[#d5c4f1]'
                    onClick={() => setIsModalShown(false)}
                    >
                        Cancel
                    </button>


                    <div className='w-[1px] h-22px] border border-stone-700'></div>
                <button className='
                    cursor-pointer
                    border border-stone-700 
                    rounded mr-4 w-full text-xs 
                    transition-colors duration-400
                    hover:bg-gradient-to-t hover:from-red-500 hover:to-white
                    text-stone-700 bg-gradient-to-t from-white to-red-500'
                    onClick={props.handleDelete}
                    >
                        Delete
                    </button>
                    
                </div>
            </dialog>
        </section>
    }
    </>
  )
}

export default Recipe
