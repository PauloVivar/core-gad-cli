import { createSlice } from '@reduxjs/toolkit';

//mod email
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
  isLoginLoading: false,
};

export const authSlice = createSlice ({
  name: 'auth',
  initialState: initialLogin,
  reducers: {
    onLogin: (state, action) => {
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin;
      state.user = action.payload.user;
      state.isLoginLoading = false;
    },
    onLogout: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
      state.user = undefined;
      state.isLoginLoading = false;
    },
    onInitLoading: (state) => {
      state.isLoginLoading = true;
    }
  }
});

export const {
  onLogin,
  onLogout,
  onInitLoading,
} = authSlice.actions;
