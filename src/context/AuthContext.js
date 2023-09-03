import React, { useReducer, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()
const URL = 'http://localhost:8000'

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

export function AuthContextPovider({ children }) {


    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoding] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            let Token = JSON.parse(token)
            try {
                axios.get(`${URL}/readUsers`)
                    .then((res) => {
                        let { data } = res;
                        if (Token.uid) {
                            const user = data.find((item) => item.uid === Token.uid)
                            dispatch({ type: "LOGIN", payload: user })
                            console.log('user', user)   
                            setIsAppLoding(false)
                        }
                    }).catch((err) => {
                        console.log('err', err)
                    })
            } catch (err) {
                console.log('err', err)
            }
        }
        setIsAppLoding(false)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, setIsAppLoding }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)