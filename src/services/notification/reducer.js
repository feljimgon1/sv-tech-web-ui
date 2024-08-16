import { append, reject } from 'ramda';
import * as actionTypes from './action-types';
import { DOMAIN } from './constants';

const initialState = {
  [DOMAIN]: []
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        [DOMAIN]: append(payload, state[DOMAIN])
      };
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        [DOMAIN]: reject(notification => notification.id === payload.id, state[DOMAIN])
      };
    default:
      return state;
  }
};
