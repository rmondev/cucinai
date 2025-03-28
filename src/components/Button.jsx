import React from 'react'

const Button = (props) => {


  return (
   <button className='
    cursor-pointer w-fit border-2 border-black pb-[4px] pr-[4px] pl-[4px] rounded-lg 
    transition-colors duration-400
    hover:bg-[#a200e0] hover:text-[#d4bff9]
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
