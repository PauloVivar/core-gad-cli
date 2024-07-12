import { createSlice } from '@reduxjs/toolkit';

//Se inicializa id=0 para seleccionar y update.
export const initialTermsForm = {
  id: 0,
  version: '',
  content: '',
  effectiveDate: '',
};

const termsSlice = createSlice ({
  name: 'terms',
  initialState: {
    latestTerms: null,
    acceptanceStatus: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestTerms.fulfilled, (state, action) => {
        state.latestTerms = action.payload;
        state.status = 'succeeded';
      })
      .addCase(acceptTerms.fulfilled, (state, action) => {
        state.acceptanceStatus = 'accepted';
        state.status = 'succeeded';
      });
  }
});

export default termsSlice.actions;