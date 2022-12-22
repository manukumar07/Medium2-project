import axios from "axios"


function fetchPost(id) {
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
            const response = await axios.get('http://localhost:5000/post/'+ id, config)
            const post = response.data.post;
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"SET_POST" , payload : post})
            dispatch({type:"POST_REQUEST"})
        } catch (error) {
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default fetchPost