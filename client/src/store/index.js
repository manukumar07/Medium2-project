import {createStore, applyMiddleware } from 'redux'

import {combineReducers} from "redux"
import thunkMiddleware from "redux-thunk"
import authReducer from './reducer/authReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';
import PostReducer from './reducer/PostReducer.jsx';
import fetchReducer from './reducer/fetchReducer.js';
import updateReducer from './reducer/updateReducer.js';
import profileReducer from './reducer/profileReducer.js';

const rootreducer  = combineReducers(
    {
        authReducer,
        PostReducer,
        fetchReducer,
        updateReducer,
        profileReducer,
    }
);


const store = createStore(rootreducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;