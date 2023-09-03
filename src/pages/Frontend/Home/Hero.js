import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../../context/AuthContext'

const initialState = { title: "", location: "", description: "" }

export default function Hero() {

  const { user } = useAuthContext()

  const [state, setState] = useState(initialState)
  const [processing, setProcessing] = useState(false)

  const URL = 'http://localhost:8000'

  const handleChange = e => {
    const { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
  }

  const handleSubmit = () => {

    let { title, location, description } = state;

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) { return window.notify('Enter the Title and title word should be 5', "error"); }
    if (location.length < 3) { return window.notify('Enter the Location and location word should be 5', "error"); }
    if (description.length < 10) { return window.notify('Enter the Description and description word should be 10', "error"); }

    setProcessing(true)

    let todo = {
      title, location, description, status: "active",
      createdBy: {
        email: user.email,
        uid: user.uid
      }
    }

    axios.post(`${URL}/createTodo`, todo)
      .then((res) => {
        window.notify(res.data.massage,'success')
        setProcessing(false)
        setState(initialState)
      })
      .catch((err) => {
        console.log('err', err)
      }).finally(() => {
        setProcessing(false)
      })

  }

  return (
    <div className='bg-light'>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '88vh' }}>
        <div className="card p-4">
          <h4 className='text-center'>Add Todo</h4>
          <div className="row mt-3">
            <div className="col-6">
              <input type="text" name='title' value={state.title} className='w-100 p-2 rounded-3 outline-none' placeholder='Enter Your Title' onChange={handleChange} />
            </div>
            <div className="col-6">
              <input type="text" name='location' value={state.location} className='w-100 p-2 rounded-3 outline-none' placeholder='Enter Your Location' onChange={handleChange} />
            </div>
            <div className="col-12 mt-3">
              <textarea name="description" value={state.description} className='w-100' cols="10" rows="5" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button className='w-75 d-block mx-auto bg-primary border-0 py-1 text-white fw-bold rounded-2' disabled={processing} onClick={handleSubmit}>
                {!processing
                  ? "Submit"
                  : "Processing"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
