"use client"
import React from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Button from '@/components/Button'
import GoogleButton from 'react-google-button'

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
    <nav className='flex flex-row p-2 justify-evenly w-full bg-gradient-to-b from-blue-300 to-white h-20'>
      <Link className='cursor-pointer' href='/'>
        <h1 className='
          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-3xl
          xl:text-4xl
          '
          >
            CucinAI
        </h1>
      </Link>

      {user && 
        <>
          <section className='flex flex-row justify-between gap-2'>
      
            <Link href='/recipes'>
              {/* <button className='cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'>Recipes</button>  */}
              <Button title='Recipes'/>
            </Link>
            <Link href='/addRecipe'>
              {/* <button className='ml-4 cursor-pointer md:text-lg lg:text-xl w-fit border-2 border-black p-1'>Add Recipe</button>  */}
              <Button title='Add Recipe'/>
            </Link>
          </section>
        </>
        }

        <div>
          <Button 
            title={!user ? 'Sign In' : 'Log Out'}
            onClick={!user ? handleSignIn : handleSignOut}>
          </Button>
        </div>

        

        
       
      
    </nav>
  )
}

export default NavBar
