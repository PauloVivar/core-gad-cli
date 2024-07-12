import { createSlice } from '@reduxjs/toolkit';

//Se inicializa id=0 para seleccionar y update.
// export const initialTermsForm = {
//   id: 0,
//   version: '',
//   content: '',
//   effectiveDate: '',
// };

const termsSlice = createSlice({
  name: 'terms',
  initialState: {
    latestTerms: null,
    acceptanceStatus: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setLatestTerms: (state, action) => {
      state.latestTerms = action.payload;
      state.status = 'succeeded';
    },
    setAcceptanceStatus: (state, action) => {
      state.acceptanceStatus = 'accepted';
      state.status = 'succeeded';
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLatestTerms, 
  setAcceptanceStatus, 
  setStatus, 
  setError } = termsSlice.actions;
