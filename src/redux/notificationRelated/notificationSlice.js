import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    clearNotification: (state) => {
      state.message = null;
      state.success = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
