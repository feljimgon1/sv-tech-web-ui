import * as actionTypes from './action-types'

export const fetchToken = () => ({
  type: actionTypes.FETCH_TOKEN,
  payload: {  }
})

export const newToken = access_token => ({
  type: actionTypes.NEW_TOKEN,
  payload: { access_token }
})
