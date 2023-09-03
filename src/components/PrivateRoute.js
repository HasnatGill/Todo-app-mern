import React from 'react'
import { Navigate } from 'react-router-dom';
import {useAuthContext} from '../context/AuthContext'

export default function PrivateRoute(props) {

    const { Component } = props;

    const { isAuth } = useAuthContext()

    if (isAuth === false)
        return <Navigate to='auth/login' replace={true} />

    return (
        <>
            <Component />
        </>
    )
}
