"use client";
import React, {useState, useEffect} from 'react'
import { UserAuth } from '@/context/AuthContext'
import Image from 'next/image'
import GoogleButton from 'react-google-button'
import {motion} from 'framer-motion'
import CucinaiLogoDark from '@/assets/cucinai_logo_dark.png'
import CucinaiLogoLight from '@/assets/cucinai_logo_light.png'




export default function Home() {

  const { user, googleSignIn, loading } = UserAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDarkMode(mediaQuery.matches)
  
      const handler = (e) => setIsDarkMode(e.matches)
      mediaQuery.addEventListener('change', handler)
  
      return () => mediaQuery.removeEventListener('change', handler)
    }, [])
  

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  };
  
  return (

    // If user is logged in, welcome message is rendered with users name and Google profile photo
    // Else, the Google sign in button is rendered.
    <>
    {!loading ? 
    <main className='flex flex-col justify-center items-center content-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]'>
      <h1 className="text-3xl font-bold mb-8">Welcome to CucinAI! 🚀</h1>
      {user ? 
        <>
          <h1>Signed In</h1>
          <section className='flex flex-col items-center gap-8'>
            
            <h2>Welcome {user.displayName}</h2>
            <Image src={user.photoURL} alt='user-image' width={40} height={40}/>
          
          </section>
        </>
        :
        <>
          <GoogleButton
            label={user? 'Log Out' : 'Sign in with Google'}
            onClick={handleSignIn}
          />
        </>
        }
    </main>
    : 
    <main className='flex justify-center items-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]'>
       <motion.div className='
                    relative 
                    w-[40px] h-[30px] 
                    sm:w-[40px] sm:h-[30px] 
                    md:w-[60px] md:h-[50px] 
                    lg:w-[60px] lg:h-[50px] 
                    xl:w-[240px] xl:h-[200px]
                    justify-center
                    items-center'
                    animate={{ rotate: [0, 10, -10, 10, -10, 0] }} // More shake frames
                    transition={{
                      duration: 0.10,           // Faster loop
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "loop"
                    }}
                    >
                  <Image
                    src={isDarkMode ? CucinaiLogoDark : CucinaiLogoLight}
                    fill
                    alt={'Cucinai Logo'}
                    className='object-contain'
                  />
                </motion.div>
    </main>
    }

    </>  
  );
}


