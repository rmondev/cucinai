"use client";
import {useContext, createContext, useState, useEffect} from 'react'
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    // User State
    const [user, setUser] = useState(null)
    // Loading State
    const [loading, setLoading] = useState(true); 

    const googleSignIn =  async () =>{
        const provider = new GoogleAuthProvider()

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        try {
            if (isMobile) {
            await signInWithRedirect(auth, provider)
            } else {
            await signInWithPopup(auth, provider)
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error)
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
            // currentUser ? console.log(currentUser) : console.log('No User Logged In!')
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut, loading}}>
            {children}
         </AuthContext.Provider>
    )

    
}

export const UserAuth = () => {
    return useContext(AuthContext)
}