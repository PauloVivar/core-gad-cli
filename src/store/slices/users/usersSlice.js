import { createSlice } from '@reduxjs/toolkit';

//Se inicializa id=0 para seleccionar y update.
export const initialUserForm = {
  id: 0,
  username: '',
  email: '',
  password: '',
  admin: false,
  //terms: false, //test
};

const initialErrors = {
  username: '',
  email: '',
  password: '',
};

export const usersSlice = createSlice ({
  name: 'users',
  initialState: {
    users: [],
    paginator: {},                            //paginacion
    userSelected: initialUserForm,            //selecionar row de tabla usuarios para update
    visibleForm: false,                       //ocultar formulario
    errors: initialErrors,                    //guardar errores config en el backend
    isLoading: true,                          //espera hasta que carga la grilla(tabla)
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
    },
    loadingError: (state, action) => {
      state.errors = action.payload;
    }
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
} = usersSlice.actions;

