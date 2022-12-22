import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar.js'
import { Helmet } from 'react-helmet'
import "../scss/components/_updatename.scss"
import { useState } from 'react'
import updateName from '../store/asyncMethods/updateName.js'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, redirect } from 'react-router-dom'
import Loading from "./Loading.js"


function UpdateName() {
    const navigate = useNavigate();
    const { user ,loading } = useSelector(state => state.authReducer);
    const {profileError} = useSelector(state => state.profileReducer)
    const {redirect , message} = useSelector(state => state.PostReducer)
    const [name,setName] = useState('')
    const userName = user.name;
    const {_id} = user;
    const dispatch = useDispatch();

    useEffect(()=>{
       setName(userName)
    },[])

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(updateName({name,_id}))

    }

    useEffect(()=>
    {
       if(profileError.length > 0)
       {
             profileError.map((error)=>toast.error(error))
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
                <title>Update Name....</title>
            </Helmet>
            {loading ? <Loading /> :
             <div className='dash-container bg-grey'>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
                <div className='dash-left'>
                    {loading ? '' : <Sidebar />}
                </div>
                <div className=' name-right'>
                    <h3>Update Name</h3>
                    <div className=''>
                        <form >
                            <div className=''>
                                <input className="bg-grey" onChange={(e)=>{setName(e.target.value)}} type="text" id='' placeholder='Name.' value={name}></input>
                                <input type="submit" className='submit' value="UPDATE NAME" onClick={handleSubmit}></input>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
             }
        </>
    )
}

export default UpdateName