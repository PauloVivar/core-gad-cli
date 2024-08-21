import { createSlice } from '@reduxjs/toolkit';

//mod email
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
  isLoginLoading: false,
};

//test
const initialState = {
  ...initialLogin,
  passwordResetRequested: false,
  passwordResetSuccess: false,
  passwordResetError: null,
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
    },

    onPasswordResetRequest: (state) => {
      state.passwordResetRequested = true;
      state.passwordResetSuccess = false;
      state.passwordResetError = null;
    },
    onPasswordResetSuccess: (state) => {
      state.passwordResetRequested = false;
      state.passwordResetSuccess = true;
      state.passwordResetError = null;
    },
    onPasswordResetFailure: (state, action) => {
      state.passwordResetRequested = false;
      state.passwordResetSuccess = false;
      state.passwordResetError = action.payload;
    },
    onClearPasswordResetStatus: (state) => {
      state.passwordResetRequested = false;
      state.passwordResetSuccess = false;
      state.passwordResetError = null;
    },
  }
});

export const {
  onLogin,
  onLogout,
  onInitLoading,

  onPasswordResetRequest,
  onPasswordResetSuccess,
  onPasswordResetFailure,
  onClearPasswordResetStatus,
} = authSlice.actions;
