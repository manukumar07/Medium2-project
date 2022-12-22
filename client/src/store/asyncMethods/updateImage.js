import axios from "axios"


function updateImage(data) {
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
            const response = await axios.post('http://localhost:5000/updateImage',data, config)
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"REDIRECT_TRUE"})
            dispatch({type:"SET_MESSAGE",payload:response.data.msg})

        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" })
            console.log(error.response.data.error);
            dispatch({type:"SET_IMAGE_ERRORS",payload:error.response.data.error})
        }
    }
}

export default updateImage