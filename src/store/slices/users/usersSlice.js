import { createSlice } from '@reduxjs/toolkit';

//Se inicializa id=0 para seleccionar y update.
// export const initialUserForm = {
//   id: 0,
//   username: '',
//   email: '',
//   password: '',
//   admin: false,
//   acceptedTerms: false, //test
// };

export const initialUserForm = {
  legalPerson: undefined,
  id: 0,
  username: '',  // Añadido para mantener consistencia
  password: '',
  email: '',

  ci: '',
  fullName: '',
  address: '',
  phone: '',
  taxpayerCity: '',
  houseNumber: '',
  birthdate: '',
  disabilityPercentage: 0,
  maritalStatus: 37,

  admin: false,
  acceptedTerms: false,
};

const initialErrors = {
  ci: '',
  email: '',
  password: '',
};

export const usersSlice = createSlice ({
  name: 'users',
  initialState: {
    users: [],
    userSelected: initialUserForm,            //selecionar row de tabla usuarios para update
    visibleForm: false,                       //ocultar formulario
    errors: initialErrors,                    //guardar errores config en el backend
    isLoading: true,                          //espera hasta que carga la grilla(tabla)
    paginator: {},                            //paginacion
    contribuyenteExists: false,               //estado para manejar la existencia del contribuyente
    contribuyenteInfo: null,                  //estado para almacenar la información del contribuyente
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          ...action.payload,
        }
      ];
      state.userSelected= initialUserForm;
      state.visibleForm= false;
      state.contribuyenteExists = null;         //era antes false
      state.contribuyenteInfo = null;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload,
            //password: user.password, //para ocultar input password de form
          };
        } 
        return user;
      });
      state.userSelected= initialUserForm;
      state.visibleForm= false;
    },
    loadingUsers: (state, action) => {
      state.users = action.payload.content;
      state.paginator = action.payload;
      state.isLoading = false;
    },
    onSelectedUserForm: (state, action) => {
      state.userSelected = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm =false;
      state.userSelected= initialUserForm;
      state.contribuyenteExists = false;
      state.contribuyenteInfo = null;
    },
    //posible eliminación
    loadingError: (state, action) => {
      state.errors = action.payload;
    },

    setContribuyenteExists: (state, action) => {
      state.contribuyenteExists = action.payload;
    },
    setContribuyenteInfo: (state, action) => {
      state.contribuyenteInfo = action.payload;
    },
    clearContribuyenteInfo: (state) => {
      state.contribuyenteExists = false;
      state.contribuyenteInfo = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action) => {
      if (typeof action.payload === 'string') {
        // Si es un string, asumimos que es un error general
        state.errors = { ...initialErrors, general: action.payload };
      } else if (typeof action.payload === 'object') {
        // Si es un objeto, actualizamos los errores específicos
        state.errors = { ...state.errors, ...action.payload };
      }
    },
    clearErrors: (state) => {
      state.errors = initialErrors;
    },
  }
});

export const {
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,

  setContribuyenteExists,
  setContribuyenteInfo,
  clearContribuyenteInfo,
  setLoading,
  setErrors,
  clearErrors
} = usersSlice.actions;

