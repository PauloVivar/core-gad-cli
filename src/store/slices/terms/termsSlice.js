import { createSlice } from '@reduxjs/toolkit';

//Se inicializa id=0 para seleccionar y update.
export const initialTermForm = {
  id: 0,
  version: '',
  content: '',
  effectiveDate: '',
  created_date: '',
  last_modified_date: '',
};

const initialErrors = {
  version: '',
  content: '',
  effectiveDate: '',
  created_date: '',
  last_modified_date: '',
};

export const termsSlice = createSlice({
  name: 'terms',
  initialState: {
    terms: [],
    termSelected: initialTermForm,
    visibleForm: false,
    errors: initialErrors,

    latestTerms: null,             //último término
    userTermsStatus: null,         //status del término
    isLoading: true,
  },
  reducers: {
    addTerm: (state, action) => {
      state.terms = [
        ...state.terms,
        {
          ...action.payload,
        }
      ];
      state.termSelected= initialTermForm;
      state.visibleForm= false;
    },
    removeTerm: (state, action) => {
      state.terms = state.terms.filter(term => term.id !== action.payload);
    },
    updateTerm: (state, action) => {
      state.terms = state.terms.map(term => {
        if (term.id === action.payload.id) {
          return {
            ...action.payload,
          };
        } 
        return term;
      });
      state.termSelected= initialTermForm;
      state.visibleForm= false;
    },
    loadingTerms: (state, action) => {
      state.terms = action.payload;
      state.isLoading = false;
    },
    onSelectedTermForm: (state, action) => {
      state.termSelected = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm =false;
      state.termSelected= initialTermForm;
    },

    // fetchTermsStart(state) {
    //   state.isLoading = true;
    //   state.errors = null;
    // },
    fetchTermsSuccess(state, action) {
      state.latestTerms = action.payload;
      state.isLoading = false;
    },
    setUserTermsStatus(state, action) {
      state.userTermsStatus = action.payload;
    },

    loadingError: (state, action) => {
      state.errors = action.payload;
      //state.isLoading = false;
    }
  },
});

export const { 
  addTerm,
  removeTerm,
  updateTerm,
  loadingTerms,
  onSelectedTermForm,
  onOpenForm,
  onCloseForm,

  //fetchTermsStart,
  fetchTermsSuccess,
  setUserTermsStatus,
  loadingError,
} = termsSlice.actions;
