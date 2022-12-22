
const init = {
    posts:[],
    count:0,
    perPage:0,
    post:{},
    fetchStatus:false
  }
  const fetchReducer = (state = init, action) => {
    if (action.type === "SET_POSTS")
      return {...state, posts: action.payload.data , count :action.payload.count , perPage:action.payload.perPage }
    else if(action.type === "SET_POST")
      return {...state,post:action.payload}
    else if(action.type === "POST_REQUEST")
      return {...state,fetchStatus:true}
    else if(action.type === "POST_RESET")
      return {...state,fetchStatus:false}
    else
      return state;
  }
  
  export default fetchReducer