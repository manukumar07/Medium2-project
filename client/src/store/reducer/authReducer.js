import jwt_decode from "jwt-decode"


                // Set Initail values
const initail = {
    loading: false,
    RegisterError: [],
    LoginError: [],
    token:"",
    user:"",
}

const verifyToken = token =>
{
    const decodedToken = jwt_decode(token)
    const expireIn = new Date(decodedToken.exp*1000);
    if(new Date() >expireIn)
    {
        localStorage.removeItem("MeduimToken")
        return null;
    }
    else
        return decodedToken;
    // console.log(decodedToken)
}
                    // Fetch token from localstorage and Decode with halp of jwt-decode
const token = localStorage.getItem("MeduimToken");
if(token)
{   
    const decoded = verifyToken(token); 
    if(decoded)
    {
        initail.token=token;
        const {user}=decoded;
        initail.user=user;
    }
}


                    // Here is reducer how acts diffrent with diffrent actions
const authReducer = (state = initail, action) => {
    if (action.type === "SET_LOADER")
        return { ...state, loading: true }
    else if (action.type === "CLOSE_LOADER")
        return { ...state, loading: false }
    else if (action.type === "REGISTER_ERRORS")
        return { ...state,RegisterError:action.payload}
    else if(action.type === "SET_TOKEN")
    {
        const decoded = verifyToken(action.payload); 
        const {user}=decoded;
        return { ...state,token:action.payload,user:user}
    }
    else if(action.type === "LOGIN_ERRORS")
    {
        return {...state , LoginError :action.payload}
    }
    else if(action.type === "LOGOUT")
        return {...state , token:"" , user:""}
    else
        return state;
}

export default authReducer;