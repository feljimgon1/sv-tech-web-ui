import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { notificationReducer } from './notificationRelated/notificationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer
  },
});

export default store;