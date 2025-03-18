"use client";
import {useContext, createContext, useState, useEffect} from 'react'
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser.uid)
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