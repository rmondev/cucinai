import React from 'react'
import AIChefMain from '@/assets/home_images/aichef_main.png'
import Image from 'next/image'

const MainInfoCard = () => {
  return (
    <main className='
        relative
        border-4
        border-black
        rounded-3xl
        z-20
        bg-transparent
        w-11/12
        h-11/12
        p-8
        '>
        <div className='flex flex-row gap-2'>
            <div className='w-1/2 border-2 rounded border-black'>
            <Image
                src={AIChefMain}
                width={320}
                height={400}
                alt='ai-chef-main'

            />
            </div>

            <div className='border-2 rounded border-black w-1/2 bg-white'>

            </div>
        </div>

    </main>
  )
}

export default MainInfoCard
