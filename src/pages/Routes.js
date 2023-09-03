import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import PrivateRoute from '../components/PrivateRoute'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function Index() {

    const { isAuth } = useAuthContext()

    return (
        <>
            <Routes>
                <Route path="/*" element={<PrivateRoute Component={Frontend} />} />
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to='/' replace={true} />} />
            </Routes>
        </>
    )
}
