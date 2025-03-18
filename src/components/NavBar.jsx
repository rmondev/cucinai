"use client"
import React from 'react'
import { UserAuth } from '@/app/context/AuthContext'

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
  
  return (
    <nav className='flex flex-row p-4 justify-between'>
      <h1 className='text-4xl'>CucinAI</h1>

      {user && 
        <>
          <section className='flex flex-row justify-between'>
            <button className='ml-4 cursor-pointer'>Recipes</button> 
            <button className='ml-4 cursor-pointer'>Add a Recipe</button> 
          </section>
        </>
        }

      {!user ? 
        <button className='cursor-pointer'

          onClick={handleSignIn}
          >Sign In
          </button>
        :
        <button className='cursor-pointer'
          onClick={handleSignOut}
          >Log Out</button>
      }
      
    </nav>
  )
}

export default NavBar
