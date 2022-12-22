// import React from 'react'
import axios from "axios"

function fetchPosts(id,page) {
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
            const response = await axios.get('http://localhost:5000/posts/'+ id +"/"+page, config)
            const {data ,count , perPage } = response.data;
            // console.log(response.data);
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"SET_POSTS" , payload : {data,count,perPage}})
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default fetchPosts