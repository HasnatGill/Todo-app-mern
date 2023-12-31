import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'antd';
import { useAuthContext } from '../../../context/AuthContext';

const URL = 'http://localhost:8000'

export default function Todo() {

  const { user } = useAuthContext()

  const [documents, setDocuments] = useState([])
  const [filterDocuments, setFilterDocuments] = useState([])
  const [upTodo, setUpTodo] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('active');

  useEffect(() => {
    axios.get(`${URL}/readTodo`)
      .then((res) => {
        let { data } = res
        let filterDocuments = data.filter(item => item.createdBy.uid === user.uid)
        let FFDocuments = filterDocuments.filter(item => item.status === type)
        setDocuments(FFDocuments)
        setFilterDocuments(FFDocuments)
      }).catch((err) => {
        console.log('err', err)
      })
  }, [type, isModalOpen])

  const handleSearch = (e) => { setFilterDocuments(documents.filter(doc => doc.title.toLowerCase().includes(e.target.value.toLowerCase()))) }

  const handleChange = (e) => {
    setUpTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleEdit = () => {
    axios.post(`${URL}/updateTodo`, upTodo)
      .then((res) => {
        if (res.data === 'Todo Successfully Update..') {
          let newDocuments = documents.map((doc) => {
            if (doc._id === upTodo._id)
              return upTodo
            return doc
          })
          window.notify(res.data, 'success')
          setFilterDocuments(newDocuments)
        }
        setIsModalOpen(false)
      }).catch((err) => {
        console.log('err', err)
      })
  }

  const handleDelete = todo => {
    axios.post(`${URL}/deleteTodo`, todo)
      .then((res) => {
        if (res.data === 'Todo Successfully Deleted..') {
          let documentAfterDelete = documents.filter(doc => doc._id !== todo._id)
          setFilterDocuments(documentAfterDelete)
          window.notify(res.data, 'success')
        }
      }).catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <>
      <div className='container'>
        <div className="mt-5">

          <div className="mb-2 d-flex justify-content-end align-items-center">
            <input type='search' placeholder='Search Todo' className=' p-1 rounded-3' onChange={handleSearch} style={{ outline: 'none' }} />

            <select name="type" className='ms-3 me-3 p-1 rounded-3' onClick={(e) => setType(e.target.value)} style={{ outline: "none" }}>
              <option value="active">Active</option>
              <option value="unActive">unActive</option>
            </select>

          </div>
          <div className="row">
            <div className="col-12 text-center">
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
                  {filterDocuments.map((todo, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{todo.title}</td>
                        <td>{todo.location}</td>
                        <td>{todo.description}</td>
                        <td><button className='me-3 border-0 bg-info text-white p-1 rounded-3 px-2' onClick={() => { setUpTodo(todo); setIsModalOpen(true) }} >Edit</button>
                          {type === 'active' && <button className='border-0 bg-danger text-white p-1 rounded-3 px-3' onClick={() => handleDelete(todo)}>Del</button>}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal title="Update Todo" open={isModalOpen} okText='Update' onOk={handleEdit} onCancel={() => setIsModalOpen(false)}>
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
          <div className="col-12 my-2">
            <select name="status" className='w-100 p-2 rounded-2' onChange={handleChange} value={upTodo.status}>
              <option value="active">Active</option>
              <option value="unActive">unActive</option>
            </select>
          </div>
        </div>
        <hr />
      </Modal>

    </>
  )
}
