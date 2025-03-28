"use client"
import React from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Button from '@/components/Button'
import Image from 'next/image'
import CucinaiLogo from '@/assets/cucinai_logo.png'
import { motion } from 'motion'


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
    <nav className='flex justify-evenly w-full bg-gradient-to-b from-[#9965f4] to-white 
          h-15
          sm:h-15
          md:h-20
          lg:h-20
          xl:h-20
          
          '>
      {/* App Logo */}
      <Link className='cursor-pointer' href='/'>
        <div className='flex items-center justify-center'>  
        <h1 className='
            font-serif
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
                md:w-[70px] md:h-[80px] 
                lg:w-[70px] lg:h-[80px] 
                xl:w-[70px] xl:h-[80px]'
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
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

      
      {user && 
        <>
          {/* Navigation Buttons */}
          <section className='flex items-center justify-center'>
            <ul className='flex flex-row justify-between gap-[3.5px] sm:gap-[15px] md:gap-[25px] lg:gap-[35px] xl:gap-[50px]'>
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
          </section>
        </>
        }
        <div className='flex items-center justify-center'>
          <Button 
            title={!user ? 'Sign In' : 'Log Out'}
            onClick={!user ? handleSignIn : handleSignOut}>
          </Button>
        </div>
    </nav>
  )
}

export default NavBar
