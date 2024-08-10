import { assoc } from 'ramda'
import { DOMAIN, HASH_KEY_TOKEN } from './constants'
import * as actionTypes from './action-types'

const initialState = {
  [HASH_KEY_TOKEN]: localStorage.getItem('token'),
  [DOMAIN]: JSON.parse(localStorage.getItem('user')),
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.SET_USER:
      return assoc(DOMAIN, payload.user, state)
    case actionTypes.SET_TOKEN:
      return assoc(HASH_KEY_TOKEN, payload.token, state)
    default:
      return state
  }
}