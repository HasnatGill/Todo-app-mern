import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const intialState = { email: "", password: "", userName: "" }
const URL = 'http://localhost:8000'

export default function Register() {

    const navigate = useNavigate('/')

    const [state, setState] = useState(intialState)
    const [processing, setProcessing] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        let { userName, email, password } = state

        if (!userName) return window.notify("Please enter your full name", "warning")
        if (!email) return window.notify("Please enter your enter", "warning")
        if (password.length < 6) return window.notify("Password lenght should be gearter then 6 digits", "warning")

        setProcessing(true)
        await axios.post(`${URL}/register`, { userName, email, password, uid: window.getRandomId() })
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
                window.notify(err.response.data, "error")
            })
            .finally(() => {
                setProcessing(false)
            })
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
