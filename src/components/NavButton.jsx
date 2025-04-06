import React from 'react'

const NavButton = (props) => {


  return (
   <button className='
    cursor-pointer border-2 border-[#2f2648] dark:border-[#d5c4f1] p-2 rounded-lg 
    dark:text-[#d5c4f1]
    dark:hover:bg-[#d5c4f1]
    dark:hover:text-[#2f2648]

    transition-colors duration-400
    hover:bg-[#2f2648] 
    hover:text-[#d5c4f1]
   
    text-[#2f2648]
    font-sans
    font-bold
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
