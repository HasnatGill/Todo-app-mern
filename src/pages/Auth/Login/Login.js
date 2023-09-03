import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const intialState = { email: "", password: "" }
const URL = 'http://localhost:8000'

export default function Login() {

    const [state, setState] = useState(intialState)
    const [processing, setProcessing] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let { email, password } = state

        if (!email) return window.notify("Please enter your enter", "warning")
        if (password.length < 6) return window.notify("Password lenght should be gearter then 6 digits", "warning")

        setProcessing(true)
        await axios.post(`${URL}/login`, { email, password })
            .then((res) => {
                if (res.statusText === 'OK') {
                    const data = { token: res.data.token, uid: res.data.uid }
                    localStorage.setItem('token', JSON.stringify(data));
                    const token = JSON.parse(localStorage.getItem('token'))
                    if (token) {
                        window.location.href = '/'
                        window.notify("User Successfully Login", "success")
                        setProcessing(false)
                    }
                }
            }).catch((err) => {
                window.notify(err.response.data.message, "error")
            })
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
