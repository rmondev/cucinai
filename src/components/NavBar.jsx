"use client"
import React, { useState, useEffect } from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import NavButton from '@/components/NavButton'
import Image from 'next/image'
import CucinaiLogoLight from '@/assets/cucinai_logo_light.png'
import CucinaiLogoDark from '@/assets/cucinai_logo_dark.png'
import { motion } from 'framer-motion'



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
          dark:bg-midnightPlum
          h-15
          sm:h-15
          md:h-25
          lg:h-25
          xl:h-25
          
          '>
      
      <section className='flex flex-row justify-between w-full items-center'>
        {/* App Logo/Brand */}
        <div className="
          flex items-center border-2 border-[#2f2648] dark:border-[#d5c4f1] rounded-xl
          ml-[8px]
          xl:ml-[16px]
          lg:ml-[16px]
          md:ml-[16px]
          sm:ml-[16px]
        ">
          <Link className='cursor-pointer' href='/'>
            <div className='
              flex 
              items-center 
              justify-center
              ml-[8px]
              xl:ml-[16px]
              lg:ml-[16px]
              md:ml-[16px]
              sm:ml-[16px]

              mt-[-2px]
              xl:mt-[-2px]
              lg:mt-[2px]
              md:mt-[0px]
              sm:mt-[-2px]
              '>  
            <h1 className='
                  font-semibold
                  text-xl
                  text-[#2f2648]
                  dark:text-[#d5c4f1]
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
                    md:w-[60px] md:h-[70px] 
                    lg:w-[60px] lg:h-[70px] 
                    xl:w-[70px] xl:h-[80px]'
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    // whileHover={{scale: 1.1}}
                    // whileHover={{scale: 1.2}}
                    >
                  <Image
                    src={isDarkMode ? CucinaiLogoDark : CucinaiLogoLight}
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
        </div>

        {/* Mobile Menu Toggle (only on small screens) */}
        <div className="sm:hidden flex items-center mr-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
        <div className="absolute top-20 left-0 w-full bg-white shadow-md sm:hidden z-50">
          <ul className="flex flex-col items-start p-4 gap-2">
            <li>
              <Link href="/recipes" onClick={() => setMobileMenuOpen(false)}>
                <NavButton title="Recipes" />
              </Link>
            </li>
            <li>
              <Link href="/addRecipe" onClick={() => setMobileMenuOpen(false)}>
                <NavButton title="Add Recipe" />
              </Link>
            </li>
            <li>
              <Link href="/aichef" onClick={() => setMobileMenuOpen(false)}>
                <NavButton title="AI Chef" />
              </Link>
            </li>
            <li>
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
