import axios from "axios"
// import { useDispatch } from "react-redux";
// import toast, { Toaster } from "react-hot-toast"


export const postRegister = (state) => {
  return async (dispatch) => {
    const config =
    {
      header: {
        'Content-type': 'application/json'
      }
    }

    dispatch({ type: 'SET_LOADER' })
    try {
      const response = await axios.post('http://localhost:5000/registers', state,config)
      if (response) {
        localStorage.setItem('MeduimToken',response.data.token);
        dispatch({type :"SET_TOKEN",payload:response.data.token})
      }
      else
        dispatch({ type: "REGISTER_ERRORS", payload: response.data.errors })
      dispatch({ type: "CLOSE_LOADER" })

    } catch (error) {
      dispatch({ type: "CLOSE_LOADER" })
      dispatch({ type: "REGISTER_ERRORS", payload: error.response.data.errors })
    }
  }
}

export const postLogin = (state) =>
{
  return async (dispatch) => {
    const config =
    {
      header: {
        'Content-type': 'application/json'
      }
    }
    // console.log("HEY");
    dispatch({ type: 'SET_LOADER' })
    try {
      const response = await axios.post('http://localhost:5000/logins', state,config)
      if (response) {
        localStorage.setItem('MeduimToken',response.data.token);
        dispatch({type :"SET_TOKEN",payload:response.data.token})
      }
      else
        dispatch({ type: "LOGIN_ERRORS", payload: response.data.errors })
      dispatch({ type: "CLOSE_LOADER" })

    } catch (error) {
      dispatch({ type: "CLOSE_LOADER" })
      dispatch({ type: "LOGIN_ERRORS", payload: error.response.data.errors })
      console.log(error.response.data.errors);
    }
  }
}