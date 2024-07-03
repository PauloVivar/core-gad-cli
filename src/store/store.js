import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/users/usersSlice';
import { authSlice } from './slices/auth/authSlice';

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    auth: authSlice.reducer,
  }
});

export { store };
