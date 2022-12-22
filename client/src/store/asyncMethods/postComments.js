// import React from 'react'
import axios from "axios"

function postComment(data) {
    return async (dispatch, getData) => {
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
            const response = await axios.post('http://localhost:5000/comment',data, config)
            console.log(response.data.msg);
            dispatch({ type: "CLOSE_LOADER" })
        } catch (error) {
            console.log(error)
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default postComment