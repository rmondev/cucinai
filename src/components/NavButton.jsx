import React from 'react'

const NavButton = (props) => {


  return (
   <button className='
    cursor-pointer w-fit border-2 border-[#2f2648] dark:border-[#d5c4f1] pb-[4px] pr-[4px] pl-[4px] rounded-lg 
    dark:text-[#d5c4f1]
    dark:hover:bg-white 
    dark:hover:text-[#2f2648]

    transition-colors duration-400
    hover:bg-[#2f2648] 
    hover:text-[#d5c4f1]
   
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

export default NavButton
