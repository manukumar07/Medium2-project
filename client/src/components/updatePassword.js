import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/components/_updatePassword.scss'
import { Helmet } from 'react-helmet'
import Sidebar from './Sidebar.js'
import toast, { Toaster } from "react-hot-toast"
import Loading from './Loading.js'
import { useDispatch ,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import updatePasswordAction from "../store/asyncMethods/updatePassword.js"
import { useEffect } from 'react'

function UpdatePassword() {
    const navigate = useNavigate();
    const { user ,loading } = useSelector(state => state.authReducer);
    const {profileError} = useSelector(state => state.profileReducer)
    const {redirect , message} = useSelector(state => state.PostReducer)
    const [state,setState] = useState({
        current :"",
        newPassword:""
    })
    const {_id} = user;
    const dispatch = useDispatch();
    

    const handleSubmit = (e) =>
    {
      e.preventDefault();
      dispatch(updatePasswordAction({current:state.current,newPassword:state.newPassword,_id}))
    }

    useEffect(()=>
    {
       if(profileError.length > 0)
       {
             profileError.map((error)=>toast.error(error.msg))
             dispatch({type:'RESET_PROFILE_ERRORS'});
       }
    },[profileError])

    useEffect(()=>
    {
       if(redirect)
       {
         navigate('/dashboard/1')
       }
    },[redirect])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Update Password....</title>
            </Helmet>
            {loading ? <Loading /> :
                <div className='dash-container bg-grey'>
                    <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
                    <div className='dash-left'>
                        {loading ? '' : <Sidebar />}
                    </div>
                    <div className=' name-right'>
                        <h3>Change Password</h3>
                        <div className=''>
                            <form >
                                <div className=''>
                                    <input className="bg-grey" onChange={(e) => { setState({...state,current:e.target.value})}} type="password" id='' placeholder='Current Password' value={state.current}></input>
                                    <input className="bg-grey" onChange={(e) => { setState({...state,newPassword:e.target.value}) }} type="password" id='' placeholder='New Password' value={state.newPassword}></input>
                                    <input type="submit" className='submit' value="UPDATE PASSWORD" onClick={handleSubmit}></input>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdatePassword