import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './action-types';

export const setNotification = (notification) => ({
  type: actionTypes.SET_NOTIFICATION,
  payload: {
    id: uuidv4(),  // Add a unique ID for each notification
    ...notification
  }
});

export const removeNotification = (id) => ({
  type: actionTypes.REMOVE_NOTIFICATION,
  payload: { id }
});
