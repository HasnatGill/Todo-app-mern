import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'
import Header from '../../components/Header/Navbar'
// import Footer from '../../components/Footer/Footer'

export default function Index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='todos' element={<Todos />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </>
    )
}
