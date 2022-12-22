// import React from 'react'

const init = {
  createError: [],
  redirect: false,
  message: [],
}
const PostReducer = (state = init, action) => {
  if (action.type === "CREATE_ERRORS")
    return { ...state, createError: action.payload }
  else if (action.type === "REMOVE_ERRORS")
    return { ...state, createError: [] }
  else if (action.type === "REDIRECT_TRUE")
    return { ...state, redirect: true }
  else if (action.type === "REDIRECT_FALSE")
    return { ...state, redirect: false }
  else if (action.type === "SET_MESSAGE")
    return { ...state, message: action.payload }
  else if (action.type === "REMOVE_MESSAGE")
    return { ...state, message: [] }
  else
    return state;
}

export default PostReducer