import React from 'react'

const NavButton = (props) => {


  return (
   <button className='
    cursor-pointer w-fit border-2 border-white pb-[4px] pr-[4px] pl-[4px] rounded-lg 
    transition-colors duration-400
    hover:bg-white hover:text-[#7b64bc]
    text-white
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
