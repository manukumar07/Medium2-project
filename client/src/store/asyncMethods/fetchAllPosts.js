import axios from "axios"


function fetchAllPost(page) {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADER" })
        try {
            console.log("hello")
            const response = await axios.get('http://localhost:5000/homePosts/'+ page)
            const data = response.data.posts
            dispatch({ type: "CLOSE_LOADER" })
            const {count , perPage } = response.data;
            dispatch({type:"SET_POSTS" , payload : {data,count,perPage}})
        } catch (error) {
            console.log(error)
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default fetchAllPost