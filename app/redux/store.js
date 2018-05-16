import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'

import userReducer from './user/index'

const rootReducer = combineReducers({ user: userReducer })

const initialState = {
  user: {
    logged: localStorage.getItem('token') !== null,
    jwt: localStorage.getItem('token') || ''
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(logger))

export default store
