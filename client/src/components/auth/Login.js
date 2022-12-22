import React, { useEffect, useState } from 'react'
import "../../scss/components/_login.scss"
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from "react-hot-toast"

function Login() {
  const [state, setState] = useState({email:"",password:""}) ;
  const {loading , LoginError} = useSelector((state) =>state.authReducer);
  const dispatch = useDispatch();

  const handleSubmit = e =>
  {
    e.preventDefault();
    dispatch(postLogin(state))
  }

  const handleChange = props =>
  {
    setState({...state,[props.target.name] : props.target.value});
  }

  useEffect(() =>{
    // console.log("Hey")
    // if(LoginError.lenght >0)
    // {
      LoginError.map((error) =>toast.error(error));
    // }

  },[LoginError])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className='login-container bg-grey'>
        <div className='login-form bg-white'>
          <span>Login</span>
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
          <form id='login-form' onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} name="email" placeholder='Enter Email' value={state.email}required></input>
            <input type="password" onChange={handleChange} name="password" placeholder='Enter Password' value={state.password} required></input>
            <button>{loading ? "..." : "Submit"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login