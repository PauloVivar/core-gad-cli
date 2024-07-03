import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
import { findAll, remove, save, update } from '@/services/useService';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialUserForm,
  addUser, 
  removeUser, 
  updateUser, 
  loadingUsers, 
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} from '@/store/slices/users/usersSlice';

const initialUsers = [
  // {
  //   id: 1,
  //   username: 'Juan',
  //   email: 'juan.test@mail.com',
  //   password: '@dfgdgdffdghf@',
  // },
];

const useUsers = () => {

  const { handlerLogout } = useAuth();
  //Reducer para CRUD en el Frond
  //const [users, dispatch] = useReducer(usersReducer, initialUsers);
  //Redux para CRUD en el Frond
  const { users } = useSelector(state => state.users);
  const dispatch = useDispatch();

  //Navigate para redirigir a UsersPage
  const navigate = useNavigate();

  //Jalar la data de la API BACKEND con SPRING BOOT
  const getUsers = async () => {
    try {
      const result = await findAll();
      //console.log(result);
      dispatch(loadingUsers(result.data));

    } catch (error) {
      if(error.response.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    let response;
    try {
      //userSchema.parse(user);
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }

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

      if (error.response && error.response.status == 400) {
        //console.error('prueba',error.response.data);
        dispatch(loadingError(error.response.data));
      } else if (error.response && error.response.status == 500 &&
        error.response.data?.message?.includes('constraint')) {

          if(error.response.data?.message?.includes('users_username_key')){
            //console.log({username: 'El username ya existe'});
            dispatch(loadingError({username: 'El username ya existe'}));
          }
          if(error.response.data?.message?.includes('users_email_key')){
            //console.log({username: 'El email ya existe'});
            dispatch(loadingError({email: 'El email ya existe'}));
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
          // eliminar de la db -> Lógica para eliminar
          await remove(id);
          dispatch(removeUser(id));

          //antes con reducer
          // dispatch({
          //   type: 'removeUser',
          //   payload: id,
          // });
          
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
    dispatch(onSelectedUserForm(user));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
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
