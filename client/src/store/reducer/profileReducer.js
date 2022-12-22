// import React from 'react'

const init = {
    profileError: [],
    comments:[],
}
const profileReducer = (state = init, action) => {
    if (action.type === "SET_PROFILE_ERRORS")
        return { ...state, profileError: action.payload }
    else if (action.type === "RESET_PROFILE_ERRORS")
        return { ...state, profileError: [] }
    else if(action.type === "SET_COMMENTS")
        return {...state , comments:action.payload}
    else
        return state;
}

export default profileReducer