import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from "react-router-dom"
import "../scss/components/_navbar.scss"


function Navbar() {
    const { user } = useSelector(state => state.authReducer);
    const dispacth = useDispatch();
    const logout = () => {
        localStorage.removeItem("MeduimToken");
        dispacth({ type: "LOGOUT" });
        <Navigate to="/" />
    }
    return (
        <nav>
            <div className='nav-container bg-light'>
                <div className='nav_row'>
                    <div className='nav_left'>
                        <Link to="/">
                            <span>Medium...</span>
                        </Link>
                    </div>
                    <div className='nav_right'>
                        {user ? <>
                            <Link to="/create">
                                <span>Create Post</span>
                            </Link>
                            <Link to="/dashboard/1">
                                <span>{user.name}</span>
                            </Link>
                            <Link onClick={logout}>
                                <span>Logout</span>
                            </Link></>

                            :
                            <><Link to="/login">
                                <span>Login</span>
                            </Link>
                                <Link to="/register">
                                    <span>Register</span>
                                </Link></>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;