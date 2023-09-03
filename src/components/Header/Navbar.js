import React from 'react'
import { LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function Navbar() {

    const { isAuth } = useAuthContext()

    return (
        <header>
            <nav className="navbar navbar_style navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to='/'>Todo App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active fw-bold" aria-current="page">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/todos' className="nav-link active fw-bold" aria-current="page">TODO</Link>
                            </li>
                            <li className="nav-item">
                                {!isAuth
                                    ? <Link to='/auth/login' className="nav-link active fw-bold" aria-current="page">Login</Link>
                                    : <button className="active fw-bold btn btn-danger flex-center mt-1 " aria-current="page"><LoginOutlined /></button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
