"use client";
import React, {useState, useEffect} from 'react'
import { UserAuth } from '@/context/AuthContext'
import Image from 'next/image'
import GoogleButton from 'react-google-button'
import MainInfoCard from '@/components/MainInfoCard';

import PageLoadAnimation from '@/components/PageLoadAnimation'




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
    {!loading ? (
      <main className='flex flex-col justify-center items-center content-center w-full bg-[#b49ff3] dark:bg-[#d5c4f1]'>
        
        

        {user ? (
          <>
            <MainInfoCard/>
          </>
        ) : (
          <>
            <div className='flex flex-col relative z-20 justify-center items-center space-y-10 mt-40'>
              <h1 className="font-bold mb-8 text-[#2f2648] xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-center">Welcome to CucinAI!</h1>
        
              <p className='font-bold text-[#2f2648] xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-xl text-center'>Your Recipe Organizer And AI Chef Companion</p>
        
              <p className='font-bold text-[#2f2648] xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-xl text-center'>Sign-in with Google to Access Your Recipe Collection</p>
        
              <GoogleButton
                label={user? 'Log Out' : 'Sign in with Google'}
                onClick={handleSignIn}
              />
            </div>
          </>
          )}

      </main>
    ) : ( 
      <main className='flex justify-center items-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]'>
        <PageLoadAnimation/>
      </main>
    )}

    </>  
  );
}


