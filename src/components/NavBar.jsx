"use client"
import React from 'react'
import { UserAuth } from '@/app/context/AuthContext'
import Link from 'next/link'

const NavBar = () => {

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


    // button {
    //   border-color: black;
    //   border-width: 2px;
    //   color: black;
    //   width: fit-content;
    //   padding: 8px;
    // }

  
  return (
    <nav className='flex flex-row p-4 justify-between'>
      <Link className='cursor-pointer' href='/'>
        <h1 className='xl:text-[48px] lg:text-[24px] md:text-[32px]'>CucinAI</h1>
      </Link>

      {user && 
        <>
          <section className='flex flex-row justify-between'>
      
            <Link href='/recipes'>
              <button className='cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'>Recipes</button> 
            </Link>
            <Link href='/addRecipe'>
              <button className='ml-4 cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'>Add Recipe</button> 
            </Link>
          </section>
        </>
        }

    
        <button 
          className='cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'
          onClick={!user ? handleSignIn : handleSignOut}>
            {!user ? 'Sign In' : 'Log Out'}
        </button>
       
      
    </nav>
  )
}

export default NavBar
