'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import BrokenEgg from '@/assets/food_images/broken_egg.png'
import Cheese from '@/assets/food_images/Cheese.png'
import ChiliPepper from '@/assets/food_images/Chili_pepper.png'
import GingerbreadMan from '@/assets/food_images/gingerbread_man.png'
import Pie from '@/assets/food_images/pie.png'
import PieceOfCake from '@/assets/food_images/piece_of_cake.png'
import PieceOfPie from '@/assets/food_images/piece_of_pie.png'
import CucinaiLogoDark from '@/assets/cucinai_logo_dark.png'
import CucinaiLogoLight from '@/assets/cucinai_logo_light.png'


// array of food images
const foodImages = [BrokenEgg, Cheese, ChiliPepper, GingerbreadMan, Pie, PieceOfCake, PieceOfPie, CucinaiLogoLight, CucinaiLogoLight, CucinaiLogoLight]

const RainingFood = () => {
  const [drops, setDrops] = useState([])

  useEffect(() => {
    const generateDrops = () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        image: foodImages[i % foodImages.length],
        left: i * (100 / 20) + (Math.random() * 5 - 2.5),
        width: 40 + Math.random() * 70,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 2,
      }))

    setDrops(generateDrops())
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <Image
        key={drop.id}
        src={drop.image}
        alt="falling food"
        className="absolute animate-fall"
        style={{
          top: '-100px',
          left: `${drop.left}%`,
          width: `${drop.width}px`,
          animationDelay: `${drop.delay}s`,
          animationDuration: `${drop.duration}s`,
          zIndex: 0,
          opacity: 0.5, // 💡 this stays the same all the way down
        }}
      />
      ))}
    </div>
  )
}

export default RainingFood
