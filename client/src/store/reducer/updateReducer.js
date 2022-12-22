// import React from 'react'

const init = {
  updateError: [],
  updateMsg: '',
  imageErrors: [],
  details:{}
}
const updateReducer = (state = init, action) => {
  if (action.type === "SET_UPDATE_ERRORS")
    return { ...state, updateError: action.payload }
  else if (action.type === "RESET_UPDATE_ERRORS")
    return { ...state, updateError: [] }
  else if (action.type === "UPDATE_MSG")
    return { ...state, updateMsg: action.payload }
  else if (action.type === "RESET_UPDATE_MSG")
    return { ...state, updateMsg: "" }
  else if (action.type === "SET_IMAGE_ERRORS")
    return { ...state, imageErrors: action.payload }
  else if (action.type === "RESET_IMAGE_ERRORS")
    return { ...state, imageErrors: [] }
    else if (action.type === "SET_DETAILS")
    return { ...state, details: action.payload }
  else
    return state;
}

export default updateReducer