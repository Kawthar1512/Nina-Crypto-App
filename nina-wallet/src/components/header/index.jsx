import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    return (
        <nav className="header-nav">
            {
                userLoggedIn
                    ? (
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className="nav-link">
                            Logout
                        </button>
                    )
                    : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register New Account</Link>
                        </>
                    )
            }
        </nav>
    )
}

export default Header
