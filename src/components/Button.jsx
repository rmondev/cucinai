import React from 'react'

const Button = (props) => {


  return (
   <button className='cursor-pointer w-fit border-2 border-black p-1 rounded-lg text-xs sm:text-md md:text-lg lg:text-xl xl:text-2xl '
    onClick={props.onClick ? props.onClick : null}
    >
        {props.title}
   </button>
  )
}

export default Button
