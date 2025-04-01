import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import {motion} from 'framer-motion'
import Image from 'next/image'
import CucinaiLogo from '@/assets/cucinai_logo.png'

const AILoadingDialog = () => {
  return (
    <dialog 
    open={true}
    className="

    fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    z-50 border border-stone-700 bg-white rounded p-2
    ">
        <h1> Generating AI Recipe... </h1>

        <motion.div className='flex justify-center items-center m-2'
         animate={{ rotate: [0, 10, -10, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         // whileHover={{scale: 1.1}}
         whileHover={{scale: 1.2}}
        >
            <Image
                src={CucinaiLogo}
                width={40}
                height={40}
                alt={'Cucinai Logo'}
                // className='object-contain'
                />

        </motion.div>

        <BeatLoader
        color={'#9965f4'}
        loading={true}
        // cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
        />

       

    </dialog>
  )
}

export default AILoadingDialog
