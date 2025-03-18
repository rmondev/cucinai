"use client";
import { UserAuth } from '@/app/context/AuthContext'

export default function Home() {

  const { user, googleSignIn, logOut } = UserAuth()
  

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
    <main className='flex flex-col justify-center items-center content-center h-screen'>
  
        <h1 className="text-3xl font-bold">Welcome to CucinAI! 🚀</h1>
        <button onClick={handleSignIn}> SignIn</button>
        <button onClick={handleSignOut}> SignOut</button>
        {user ? 
        <h1>Signed In</h1> 
        : 
        <h1>Signed Out</h1>
        }
        
 
    </main>
  );
}
