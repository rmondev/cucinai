"use client";
import {useContext, createContext, useState, useEffect} from 'react'
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const googleSignIn =  async () =>{
        const provider = new GoogleAuthProvider()
        
        try{
             await signInWithPopup(auth,provider)
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = async () => {
        try { 
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            currentUser ? console.log(currentUser) : console.log('No User Logged In!')
            setUser(currentUser)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
         </AuthContext.Provider>
    )

    
}

export const UserAuth = () => {
    return useContext(AuthContext)
}