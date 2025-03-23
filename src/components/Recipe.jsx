import React from 'react'

const Recipe = (props) => {


    const ingredientsList = () => (
        props.recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex flex-row mb-2">
                <table className='w-fit'>
                    <tbody >
                        <tr>
                            <th className="w-0"></th>
                            <th className="w-25"></th>
                            <th className="w-40"></th>
                        </tr>
                        <tr>
                            <td className='items-start'>{ingredient.quantity}</td>
                            <td className='items-start'>{ingredient.unit}</td>
                            <td className='items-start'>{ingredient.name}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        ))
    );

    const instructionsList = () => (
        props.recipe.instructions.map((step, index) => (
            <div key={index} className='mb-2 flex flex-col justify-start items-start'>
                <p className='font-semibold'>Step {index + 1}</p>
                <p>{step}</p>
            </div>
        ))
    );


  return (
    <>
         { props.recipe.ingredients.length > 0 &&
                    <section className="
                        w-11/12 mt-2 h-fit border-2 border-black rounded-lg p-4 mb-4
                        sm:w-11/12 sm:mt-2 sm:h-fit 
                        md:w-11/12 md:h-fit
                        lg:w-1/2 lg:m-4 lg:h-fit
                        xl:w-1/2 xl:m-4 xl:p-4 xl:h-fit"
                        >
                        <section className="">
                            <h1 className='text-2xl border-b-2 w-fit mb-4'>{props.recipe.title}</h1>

                            {props.recipe.ingredients.length > 0 ?
                            <div className='flex flex-col items-start'>
                                <h2 className='text-xl border-b-2 w-fit mb-4'>Ingredients</h2>
                                


                                {ingredientsList()}
                                


                            </div>
                            
                            : null}
                            {props.recipe.instructions.length > 0 ?
                                <div className='mt-4 flex flex-col justify-start items-start'>
                                    <h2 className='text-xl border-b-2 w-fit mb-4'>Instructions</h2>
                                    {instructionsList()}
                                </div>
                            : null}
                        </section>
                    </section>
        }
    </>
  )
}

export default Recipe
