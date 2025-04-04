"use client"
import React, { useState, useEffect } from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import NavButton from '@/components/NavButton'
import Image from 'next/image'
import CucinaiLogoLight from '@/assets/cucinai_logo_light.png'
import CucinaiLogoDark from '@/assets/cucinai_logo_dark.png'
import { motion } from 'framer-motion'
import { LiaHamburgerSolid } from "react-icons/lia";



const NavBar = () => {

  const {user, googleSignIn, logOut} = UserAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
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
  
    const handleSignOut = async () => {
      try {
        logOut()
      } catch (error) {
        console.log(error)
      }
    };
  
  return (
    <nav className='
          sticky
          top-0
          z-50
          flex 
          justify-between 
          w-full 
          bg-[#d5c4f1]
          dark:bg-[#2f2648]
          h-20
          sm:h-20
          md:h-25
          lg:h-25
          xl:h-25
          border-b-4 border-b-[#2f2648] dark:border-b-[#b49ff3]
          
          '>
      
      <section className='flex flex-row justify-between w-full items-center'>
        {/* App Logo/Brand */}
        <div className="
          flex items-center border-2 border-[#2f2648] dark:border-[#d5c4f1] rounded-xl
          p-2
          
          m-[16px]
          xl:m-[16px]
          lg:m-[16px]
          md:m-[16px]
          sm:m-[16px]
        ">
          <Link className='cursor-pointer' href='/'>
            <div className='
              flex 
              items-center 
              justify-center
              '>  
            <h1 className='
                  font-semibold
                  text-xl
                  pl-2
                  text-[#2f2648]
                  dark:text-[#d5c4f1]
                  sm:text-2xl
                  md:text-3xl
                  lg:text-3xl
                  xl:text-3xl
                  '
                  >
                    CucinAI
              </h1>
              <motion.div className='
                    relative 
                    w-[40px] h-[30px] 
                    sm:w-[40px] sm:h-[30px] 
                    md:w-[60px] md:h-[50px] 
                    lg:w-[60px] lg:h-[50px] 
                    xl:w-[60px] xl:h-[50px]
                    justify-center
                    items-center'
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    // whileHover={{scale: 1.1}}
                    // whileHover={{scale: 1.2}}
                    >
                  <Image
                    src={isDarkMode ? CucinaiLogoDark : CucinaiLogoLight}
                    fill
                    alt={'Cucinai Logo'}
                    className='object-contain'
                  />
                </motion.div>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle (only on small screens) */}
        <div className="sm:hidden flex items-center mr-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black focus:outline-none"
          >
             <a
              >
           
           
              <LiaHamburgerSolid className="w-12 h-12 text-[#2f2648] dark:text-[#b49ff3]"/>
            
              
              </a>
          </button>
        </div>

        
        {/* Desktop Nav & Auth Controls (hidden on small screens) */}
        {user && (
          <div className="hidden sm:flex items-center justify-center gap-4">
            {/* Navigation Buttons */}
            <ul className='flex flex-row gap-4'>
              <li><Link href='/recipes'><NavButton title='Recipes' /></Link></li>
              <li><Link href='/addRecipe'><NavButton title='Add Recipe' /></Link></li>
              <li><Link href='/aichef'><NavButton title='AI Chef' /></Link></li>
            </ul>

            {/* SignIn/Logout Button
            <Button
              title='Log Out'
              onClick={handleSignOut}
            /> */}
          </div>

  

        )}

        {/* Right: Sign In / Log Out Button */}
        <div className="
          hidden sm:flex 
          items-center
          mr-[8px]
          xl:mr-[16px]
          lg:mr-[16px]
          md:mr-[16px]
          sm:mr-[16px]
          ">
          <NavButton title={!user ? 'Sign In' : 'Log Out'} onClick={!user ? handleSignIn : handleSignOut} />
        </div>
      </section>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 w-1/2 right-0 shadow-md sm:hidden z-50 
          bg-[#d5c4f1]
          dark:bg-[#2f2648]
          border-l-2
          border-b-2
          dark:border-l-[#d5c4f1]
          border-l-[#2f2648]
          dark:border-b-[#d5c4f1]
          border-b-[#2f2648]
          rounded-lb-xl
          rounded-bl-xl
          ">
          <ul className="flex flex-col items-end text-[#2f2648] dark:text-[#b49ff3]">

            <li className='p-4 w-full text-left border-b-2'>
              <span className='flex flex-row justify-between items-center gap-x-2'>
             
                <span className='font-semibold'>Welcome, {user.displayName.split(' ')[0]}</span>
                <Image
                  src={user.photoURL}
                  alt='user-image'
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                
              </span>
            </li>

            

            <li className='p-4 w-full text-right'>
              <Link href="/recipes" onClick={() => setMobileMenuOpen(false)}>
                <button className='cursor-pointer font-semibold'>Recipes</button>
              </Link>
            </li>
            <li className='p-4 w-full text-right'>
              <Link href="/addRecipe" onClick={() => setMobileMenuOpen(false)}>
              <button className='cursor-pointer font-semibold'>Add Recipe</button>
              </Link>
            </li>
            <li className='p-4 w-full text-right'>
              <Link href="/aichef" onClick={() => setMobileMenuOpen(false)}>
                <button className='cursor-pointer font-semibold'>AI Chef</button>
              </Link>
            </li>
            <li className='p-4 w-full text-right border-t-2 dark:border-t-[#d5c4f1] border-t-[#2f2648]'>
              <NavButton
                title={!user ? 'Sign In' : 'Log Out'}
                onClick={() => {
                  setMobileMenuOpen(false)
                  !user ? handleSignIn() : handleSignOut()
                }}
              />
            </li>
          </ul>
        </div>
      )}

    </nav>
  )
}

export default NavBar
