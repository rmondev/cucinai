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
      <main className='flex flex-col justify-center items-center content-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]'>
        {/* <h1 className="text-3xl font-bold mb-8">Welcome to CucinAI! 🚀</h1> */}
        {user ? (
          <>
            {/* <h1>Signed In</h1>
            <section className='flex flex-col items-center gap-8'>
              
              <h2>Welcome {user.displayName}</h2>
              <Image src={user.photoURL} alt='user-image' width={40} height={40}/>
            
            </section> */}
            <MainInfoCard/>
          </>
        ) : (
          <>
            <GoogleButton
              label={user? 'Log Out' : 'Sign in with Google'}
              onClick={handleSignIn}
            />
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


