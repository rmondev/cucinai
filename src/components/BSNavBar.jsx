'use client'
import React, {useState} from 'react'

import Image from 'next/image'
import CucinaiLogo from '@/assets/cucinai_logo.png'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/NavButton'
import {UserAuth} from '@/context/AuthContext'


const BSNavBar = () => {



    const {user, googleSignIn, logOut} = UserAuth()
    
 

  
    const handleSignIn = async () => {
        try {
        await googleSignIn()
        } catch (error) {
        console.log(error)
        }
    };

    const handleSignOut = async () => {
    try {
        logOut()
    } catch (error) {
        console.log(error)
    }
    };

    const LogoBrand = () => {
        return (
            <Link className='cursor-pointer' href='/'>
                <div className='
                    flex 
                    items-center 
                    justify-center
                    ml-[8px]
                    xl:ml-[16px]
                    lg:ml-[16px]
                    md:ml-[16px]
                    sm:ml-[16px]
                    '>  
                    <h1 className='
                        
                        font-semibold
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        lg:text-3xl
                        xl:text-4xl
                        '
                        >
                            CucinAI
                    </h1>
                    <motion.div className='
                            
                            relative 
                            w-[30px] h-[60px] 
                            sm:w-[40px] sm:h-[60px] 
                            md:w-[60px] md:h-[70px] 
                            lg:w-[60px] lg:h-[70px] 
                            xl:w-[70px] xl:h-[80px]'
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            // whileHover={{scale: 1.1}}
                            whileHover={{scale: 1.2}}
                            
                            >
                            
                        <Image
                            src={CucinaiLogo}
                            fill
                            sizes="(max-width: 640px) 30px,
                                (max-width: 768px) 40px,
                                (max-width: 1024px) 50px,
                                (max-width: 1280px) 60px,
                                (max-width: 1536px) 70px,
                                60px"
                            alt={'Cucinai Logo'}
                            className='object-contain'
                        />
                    </motion.div>
                </div>
            </Link>
        )
    }

  return (

   
   <h1>Hello</h1>


   



  )
}

export default BSNavBar
