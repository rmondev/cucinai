import React from 'react'
import AIChefMain from '@/assets/home_images/aichef_main.png'
import Image from 'next/image'

const MainInfoCard = () => {
  return (
    <section className='
      
      relative
      justify-evenly
      items-center 
      z-20 
      flex 
      flex-col
      xl:flex-row
      lg:flex-row
      md:flex-row


      border-2 
      rounded-3xl
      border-[#2f2648]
      xl:m-[20px]
      lg:m-[20px]
      md:m-[20px]
      sm:m-[20px]
      m-[20px]

      xl:h-[80vh]
      lg:h-[80vh]
      md:h-[80vh]
      sm:h-[85vh]
      h-[83vh]

      xl:w-[97vw]
      lg:w-[97vw]
      md:w-[95vw]
      sm:w-[95vw]
      w-[95vw]



      '>
      <div className='
        relative 
        w-screen 
        xl:h-[70vh] 
        xl:w-[60vh] 
        lg:h-[70vh] 
        lg:w-[60vh] 
        md:h-[70vh] 
        md:w-[60vh] 
        sm:h-[70vh] 
        sm:w-[60vh] 
        m-4

        h-[50vh]
        '
        >
        <Image
          src={AIChefMain}
          alt='ai-chef-main'
          className='object-contain'
          fill
          sizes="
            (max-width: 640px) 80vw,
            (max-width: 768px) 70vw,
            (max-width: 1024px) 60vw,
            (max-width: 1280px) 70vw,
            30vw
          "
          />
      </div>

      <div className='
        flex 
        flex-col 
        justify-center
        items-center
        xl:w-1/2
        lg:w-full
        md:w-full
        sm:w-full
        m-2
         
        '>
        <section className='
         text-[#2f2648]
          xl:text-6xl
          lg:text-5xl
          md:text-4xl
          sm:text-3xl
          text-4xl
          m-4
          font-bold
          '>
        <div className='flex flex-col space-y-7'>        
          <p>Hi! I'm Chef C!</p>
          
          <p>I'm here to help you organize your recipe collection and help you enhance those recipes or create similar versions of your favorite ones!</p>
          
          <p>Add a Recipe and let's see where we can take it!</p>
        </div>
        </section>

      </div>

    </section>
  )
}

export default MainInfoCard
