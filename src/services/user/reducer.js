import { assoc } from 'ramda'
import { HASH_KEY_TOKEN } from './constants'
import * as actionTypes from './action-types'

const initialState = {}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.NEW_TOKEN:
      return assoc(HASH_KEY_TOKEN, payload.access_token, state)
    default:
      return state
  }
}