import axios from "axios"


 const createAction = (postData) =>
{
    return async(dispatch , getData) =>
    {
        const {authReducer} = getData();
        const token = authReducer.token
        dispatch({type:"SET_LOADER"})
        try {
            const config =
            {
                headers:{
                    Authorizaton: 'Bearer ' + token
                }
            }

            const data  = await axios.post("http://localhost:5000/create_post",postData,config);
            dispatch({type:"CLOSE_LOADER"})
            dispatch({type:"REDIRECT_TRUE"})
            dispatch({type:'SET_MESSAGE' ,payload:data.data.msg})
            dispatch({type:"REMOVE_ERRORS"});
            console.log(data);
        } catch (error) {
            dispatch({type:"CLOSE_LOADER"})
            dispatch({type:"CREATE_ERRORS" ,payload:error.response.data.errors})
            console.log(error.response);
        }

    }
}


export default createAction