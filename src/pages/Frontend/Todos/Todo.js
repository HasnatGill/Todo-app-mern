import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'antd';

export default function Todo() {

  const [documents, setDocuments] = useState([])
  const [upTodo, setUpTodo] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setUpTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const URL = 'http://localhost:8000'

  useEffect(() => {
    axios.get(`${URL}/readTodo`)
      .then((res) => {
        let { data } = res
        setDocuments(data)
      }).catch((err) => {
        console.log('err', err)
      })
  }, [isModalOpen])

  const handleEdit = () => {
    axios.post(`${URL}/updateTodo`, upTodo)
      .then((res) => {
        if (res.data === 'Todo Update') {
          setIsModalOpen(false)
        }
        setIsModalOpen(false)
      }).catch((err) => {
        console.log('err', err)
      })
  }

  const handleDelete = todo => {
    axios.post(`${URL}/deleteTodo`, todo)
      .then((res) => {
        if (res.data === 'Todo Deleted') {
          let documentAfterDelete = documents.filter(doc => doc._id !== todo._id)
          setDocuments(documentAfterDelete)
        }
      }).catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <>
      <div className='container'>
        <div className="mt-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Location</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((todo, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{todo.title}</td>
                    <td>{todo.location}</td>
                    <td>{todo.description}</td>
                    <td><button className='me-3 border-0 bg-info text-white p-1 rounded-3 px-2' onClick={() => { setUpTodo(todo); setIsModalOpen(true) }} >Edit</button>
                      <button className='border-0 bg-danger text-white p-1 rounded-3 px-3' onClick={() => handleDelete(todo)}>Del</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleEdit} onCancel={() => setIsModalOpen(false)}>
        <div className="row mt-3">
          <div className="col-6">
            <input type="text" name='title' value={upTodo.title} className='w-100 p-2 rounded-3 outline-none' placeholder='Enter Your Title' onChange={handleChange} />
          </div>
          <div className="col-6">
            <input type="text" name='location' value={upTodo.location} className='w-100 p-2 rounded-3 outline-none' placeholder='Enter Your Location' onChange={handleChange} />
          </div>
          <div className="col-12 mt-3">
            <textarea name="description" value={upTodo.description} className='w-100' cols="10" rows="5" onChange={handleChange}></textarea>
          </div>
        </div>
      </Modal>

    </>
  )
}