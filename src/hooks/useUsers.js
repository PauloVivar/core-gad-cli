import { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersReducer } from '../reducers/usersReducer';
import { AuthContext } from '@/Auth/Context/AuthContext';
import { findAll, remove, save, update } from '@/services/useService';

import Swal from 'sweetalert2';

//import { userSchema } from '../Components/UserForm';
//import { z } from 'zod';

const initialUsers = [
  // {
  //   id: 1,
  //   username: 'Juan',
  //   email: 'juan.test@mail.com',
  //   password: '@dfgdgdffdghf@',
  // },
];

//Se inicialeza id=0 para seleccionar y update.
const initialUserForm = {
  id: 0,
  username: '',
  email: '',
  password: '',
  admin: false,
};

const initialErrors = {
  username: '',
  email: '',
  password: '',
};

const useUsers = () => {
  //Reducer para CRUD en el Frond
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  //Estado para selecionar row de tabla usuarios para update
  const [userSelected, setUserSelected] = useState(initialUserForm);

  //Estado para ocultar formulario
  const [visibleForm, setVisibleForm] = useState(false);

  //Estado para guardar errores conf en el backend
  const [errors, setErrors] = useState(initialErrors);

  //Navigate para redirigir a UsersPage
  const navigate = useNavigate();

  const { handlerLogout } = useContext(AuthContext);

  //Jalar la data de la API BACKEND con SPRING BOOT
  const getUsers = async () => {
    const result = await findAll();
    //console.log(result);
    dispatch({
      type: 'loadingUsers',
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    let response;
    try {
      //userSchema.parse(user);
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }

      dispatch({
        type: user.id === 0 ? 'addUser' : 'updateUser',
        payload: response.data,
        //payload: user,
      });

      user.id === 0
        ? Swal.fire({
            title: 'Usuario creado!',
            text: 'Usuario creado con éxito',
            icon: 'success',
          })
        : Swal.fire({
            title: 'Usuario actualizado!',
            text: 'Usuario actualizo con éxito',
            icon: 'success',
          });

      //Form oculto y reseteado
      handlerCloseForm();
      //Redirigir a UsersPage
      navigate('/users');
    } catch (error) {

      // if (error instanceof z.ZodError) {
      //console.error('test2', error.errors);
      //   setErrors(error.response.data);
      // }

      //2da forma
      if (error.response && error.response.status == 400) {
        //console.error('prueba',error.response.data);
        setErrors(error.response.data);
      } else if (error.response && error.response.status == 500 &&
        error.response.data?.message?.includes('constraint')) {

          if(error.response.data?.message?.includes('users_username_key')){
            //console.log({username: 'El username ya existe'});
            setErrors({username: 'El username ya existe'});
          }
          if(error.response.data?.message?.includes('users_email_key')){
            //console.log({username: 'El email ya existe'});
            setErrors({email: 'El email ya existe'});
          }
      } else if(error.response.status == 401) {
        handlerLogout();

      } else {
          throw error;
      }
    }
  };

  const handlerDeleteUser = (id) => {
    //console.log(id);

    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Este usuario será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
    }).then( async(result) => {
      if (result.isConfirmed) {

        try {
           /* eliminar de la db */
          await remove(id);
          /* Lógica para eliminar */
          dispatch({
            type: 'removeUser',
            payload: id,
          });
          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario ha sido eliminado.',
            icon: 'success',
          });

        } catch (error) {
          if(error.response.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerSelectedUserForm = (user) => {
    //console.log(user);
    //Se muestra form al seleccionar
    handlerOpenForm();
    setUserSelected({ ...user });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};

export { useUsers };
