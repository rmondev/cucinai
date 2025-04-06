import React from 'react'

const Button = (props) => {


  return (
   <button className='

   
    cursor-pointer w-fit border-2 border-[#2f2648] dark:border-[#2f2648] pb-[4px] pr-[4px] pl-[4px] rounded-lg 

    dark:text-[#2f2648]

    dark:hover:bg-[#2f2648]
    dark:hover:text-[#d5c4f1]

    transition-colors duration-400
    hover:bg-[#d5c4f1]
    hover:text-[#2f2648]
    text-[#2f2648]


    font-sans
    font-semibold
    text-sm 
    sm:text-sm 
    md:text-lg 
    lg:text-xl 
    xl:text-2xl'
    onClick={props.onClick ? props.onClick : null}
    >
        {props.title}
   </button>
  )
}

export default Button
