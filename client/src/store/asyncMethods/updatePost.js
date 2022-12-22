import axios from "axios"


function updatePost(data) {
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
            const response = await axios.post('http://localhost:5000/update',data, config)
            dispatch({type:"UPDATE_MSG" , payload:response.data.msg})
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"REDIRECT_TRUE"})
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"SET_UPDATE_ERRORS",payload:error.response.data.errors.errors})
            // console.log(error.response.data.errors.errors);
        }
    }
}

export default updatePost