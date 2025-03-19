"use client";
import { UserAuth } from '@/app/context/AuthContext'
import Image from 'next/image'


export default function Home() {

  const { user, googleSignIn, logOut } = UserAuth()
  
  return (
    <main className='flex flex-col justify-center items-center content-center h-screen'>
  
        <h1 className="text-3xl font-bold mb-8">Welcome to CucinAI! 🚀</h1>
       
        {user ? 
        <>
          <h1>Signed In</h1>
          <section className='flex flex-col items-center gap-8'>
            
            <h2>Welcome {user.displayName}</h2>
            <Image src={user.photoURL} alt='user-image' width={40} height={40}/>
          
          </section>
        </>
      
        : 
        <h1>Signed Out</h1>
        }
        
 
    </main>
  );
}
