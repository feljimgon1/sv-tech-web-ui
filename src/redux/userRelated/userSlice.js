import { createSlice } from '@reduxjs/toolkit';

const parseJSON = (item) => {
  try {
    return JSON.parse(item);
  } catch (e) {
    return null; // or handle the error as needed
  }
};

const initialUser = parseJSON(localStorage.getItem('user'));

const initialState = {
  status: initialUser.status || 'idle',
  _id:  initialUser._id || '',
  name: initialUser.name || '',
  surname: initialUser.surname || '',
  email: initialUser.email || '',
  active: initialUser.active || '',
  rol: initialUser.rol || '',
  username: initialUser.username|| '',
  companies: initialUser.companies || []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authRequest: (state) => {
      state.status = 'loading';
    },
    authSuccess: (state, action) => {
      state.status = 'success';
      state._id = action.payload._id
      state.name = action.payload.name
      state.surname = action.payload.surname
      state.email = action.payload.email
      state.active = action.payload.active
      state.rol = action.payload.rol
      state.username = action.payload.username
      state.companies = action.payload.companies
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    authFailed: (state, action) => {
      state.status = 'failed';
      state.response = action.payload;
    },
    authError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    authLogout: (state) => {
      localStorage.removeItem('user');
      state.currentUser = null;
      state.status = 'idle';
      state.error = null;
      state.currentRol = null
    },

    doneSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDeleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },

    getRequest: (state) => {
      state.loading = true;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  },
});

export const {
  authRequest,
  underControl,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
  toggleDarkMode
} = userSlice.actions;

export const userReducer = userSlice.reducer;