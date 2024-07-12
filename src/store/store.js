import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './slices/users/usersSlice';
import { authSlice } from './slices/auth/authSlice';
import { termsSlice } from './slices/terms/termsSlice';

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    auth: authSlice.reducer,
    terms: termsSlice.reducer,
  }
});

export { store };
