import React, {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import CucinaiLogoLight from '@/assets/cucinai_logo_light.png'
import Image from 'next/image'

const PageLoadAnimation = () => {
      
  return (
    <motion.div
        className="
            relative 
            w-[150px] h-[150px]
        "

        animate={{ scale: [1, 3.0, 1] }}
        transition={{
            duration: 0.3,          
            repeat: Infinity,
            ease: "easeInOut",

        }}
        >
        <Image
            src={CucinaiLogoLight}
            
            alt={'Cucinai Logo'}
            className='object-contain'
        />
    </motion.div>
  )
}

export default PageLoadAnimation
