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
          <ul className='flex flex-row justify-between gap-2'>
      
            <li>
              <Link href='/recipes'>
                <Button title='Recipes'/>
              </Link>
            </li>
           
            <li>
              <Link href='/addRecipe'>
                <Button title='Add Recipe'/>
              </Link>
            </li>

            <li>
              <Link href='/aichef'>
                <Button title='AI Chef'/>
              </Link>
            </li>
            

          </ul>
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
