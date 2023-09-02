import React, { useReducer, createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, firestore } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore/lite'

export const AuthContext = createContext()


const initialState = { isAuth: false }

const reducer = ((state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            const { user } = payload
            return { isAuth: true, user }
        case "LOGOUT":
            return { isAuth: false }
        default:
            return state
    }
})

export default function AuthContextPovider({ children }) {


    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoding] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUser(user)
            } else {
                setIsAppLoding(false)
                // ... 
            }
        });
    }, [])

    const readUser = async (authUser) => {
        const docRef = doc(firestore, "users", authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let user = docSnap.data()
            const isCustomer = user.roles?.includes("customer")
            dispatch({ type: "LOGIN", payload: { user, isCustomer } })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        setIsAppLoding(false)
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
