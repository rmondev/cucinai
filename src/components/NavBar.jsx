"use client"
import React from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Button from '@/components/Button'
import GoogleButton from 'react-google-button'
import Image from 'next/image'
import CucinaiLogo from '@/assets/cucinai_logo.png'

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

      <div className='flex flex-row items-center'>  
        <div className='relative w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[70px] xl:h-[70px]'>
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
          </div>
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

        </div>
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
