import axios from "axios"


function updatePassword(data) {
    return async (dispatch,getData) => {
        const { authReducer } = getData();
        const token = authReducer.token
        dispatch({ type: "SET_LOADER" })
        const config =
        {
            headers: {
                Authorizaton: 'Bearer ' + token
            }
        }
        try {
            const response = await axios.post('http://localhost:5000/updatePasswords',data , config)
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"SET_MESSAGE",payload:response.data.msg})
            dispatch({type:"REDIRECT_TRUE"})
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({type:"SET_PROFILE_ERRORS",payload:error.response.data.errors})
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default updatePassword;