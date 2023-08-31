import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const intialState = { email: "", password: "" }

export default function Login() {

    const navigate = useNavigate()

    const [state, setState] = useState(intialState)
    const [processing, setProcessing] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleLogin = () => {
        setProcessing(true)
        console.log('state', state)
        navigate('/')
        setProcessing(false)
    }

    return (
        <div className='login_page flex-center'>
            <div className="card px-3 pt-3 rounded-5" style={{ minWidth: '22rem' }}>
                <h1 className='text-center my-2'>Login</h1>

                <input type="email" name='email' placeholder='Enter Your Email' onChange={handleChange} className='login_input rounded-2 my-3 w-100' />
                <input type="password" name='password' placeholder='Enter your Passwoed' onChange={handleChange} className='login_input rounded-2' />

                <Link to='#' className='text-end my-2' >Forget Password?</Link>

                <button className='btn btn-danger rounded-4 w-50 d-block mx-auto mt-3' onClick={handleLogin} disabled={processing}>{processing ? "Loading" : "Login"}</button>

                <div className='d-flex justify-content-end mt-3'>
                    <p className='me-1'>Create an account?</p>
                    <Link to='/auth/register'>Register</Link>
                </div>

            </div>
        </div>
    )
}
