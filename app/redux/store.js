import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import userReducer from './user/index'

const rootReducer = combineReducers({
  user: userReducer,
  router: routerReducer
})

const initialState = {
  user: {
    logged: localStorage.getItem('token') !== null,
    jwt: localStorage.getItem('token') || ''
  }
}
const history = createHistory()
const middlewares = [logger, routerMiddleware(history)]
const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

export { store, history }
