import axios from "axios"


function fetchdetails(id) {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADER" })
        try {
            const response = await axios.get('http://localhost:5000/detail/'+ id)
            // console.log(response.data.comment)
            dispatch({ type: "CLOSE_LOADER" })
            dispatch({type:"SET_COMMENTS" , payload : response.data.comment})
            dispatch({type:"SET_DETAILS" , payload : response.data.post})
        } catch (error) {
            console.log(error)
            dispatch({ type: "CLOSE_LOADER" })
        }
    }
}

export default fetchdetails