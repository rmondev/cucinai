"use client"
import React, {useEffect,useState} from 'react'

import RainingFood from '@/components/RainingFood'


const TestPage = () => {

  return (
    <main className="relative z-10 flex flex-col justify-center items-center h-screen bg-[#b49ff3] dark:bg-[#d5c4f1]">
    <RainingFood /> {/* animated background */}
    <h1 className="text-3xl font-bold mb-8 z-20 relative">Welcome to CucinAI! 🚀</h1>
    {/* Your main content */}
  </main>
  )
}

export default TestPage
