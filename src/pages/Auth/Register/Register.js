import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const intialState = { email: "", password: "", userName: "" }

export default function Register() {

    const [state, setState] = useState(intialState)
    const [processing, setProcessing] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleRegister = () => {
        setProcessing(true)
        console.log('state', state)
        setProcessing(false)
    }

    return (
        <div className='register_page flex-center'>
            <div className="card px-3 pt-3 rounded-5" style={{ minWidth: '22rem' }}>
                <h1 className='text-center my-2'>Register</h1>
                <input type="text" name='userName' placeholder='Enter Your Full Name' onChange={handleChange} className='register_input rounded-2 my-3' />
                <input type="email" name='email' placeholder='Enter Your Email' onChange={handleChange} className='register_input rounded-2 mb-3' />
                <input type="password" name='password' placeholder='Enter your Passwoed' onChange={handleChange} className='register_input rounded-2' />

                <button className='btn btn-success rounded-4 w-50 d-block mx-auto mt-3' onClick={handleRegister} disabled={processing}>{processing ? "Loading" : "Register"}</button>

                <div className='d-flex justify-content-end mt-3'>
                    <p className='me-1'>Already account?</p>
                    <Link to='/auth/login'>Login</Link>
                </div>

            </div>
        </div>
    )
}
