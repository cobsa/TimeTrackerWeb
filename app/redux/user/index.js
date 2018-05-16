import { cloneDeep } from 'lodash'

// Actions

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// Reducer

const initialState = {
  logged: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_USER: {
      const newState = cloneDeep(state)
      const { payload } = action
      if (payload.jwt) {
        newState.jwt = payload.jwt
        newState.logged = true
      }
      return newState
    }
    case LOGOUT_USER:
      return initialState
    default:
      return cloneDeep(state)
  }
}

// Action creators

export function loginUser(payload) {
  return {
    type: LOGIN_USER,
    payload
  }
}

export function logoutUSer() {
  return {
    type: LOGOUT_USER
  }
}
