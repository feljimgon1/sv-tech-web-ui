import * as actionTypes from './action-types'

export const setToken = token => ({
  type: actionTypes.SET_TOKEN,
  payload: { token }
})

export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: { user }
})