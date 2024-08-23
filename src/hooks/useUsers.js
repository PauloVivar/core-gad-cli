import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/auth/hooks/useAuth';
import { findAllPages, save, update, remove, register } from '@/services/userService';
import { checkContribuyenteExists, getContribuyenteInfo } from '@/services/taxpayerService';
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

  setContribuyenteExists,
  setContribuyenteInfo,
  clearContribuyenteInfo,

  setLoading,
  setErrors,
  clearErrors,
} from '@/store/slices/users/usersSlice';

import Swal from 'sweetalert2';

// const initialUsers = [
//   // {
//   //   id: 1,
//   //   username: 'Juan',
//   //   email: 'juan.test@mail.com',
//   //   password: '@dfgdgdffdghf@',
//   // },
// ];

const useUsers = () => {
  const { handlerLogout } = useAuth();
  //Reducer para CRUD en el Frond
  //const [users, dispatch] = useReducer(usersReducer, initialUsers);
  
  //Redux para CRUD en el Frond
  const { 
    users, 
    userSelected, 
    visibleForm, 
    errors, 
    isLoading, 
    paginator,

    contribuyenteExists,
    contribuyenteInfo,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  //Navigate para redirigir a UsersPage
  const navigate = useNavigate();

  //Jalar la data de la API BACKEND con SPRING BOOT
  const getUsers = async (page = 0) => {
    try {
      const result = await findAllPages(page);
      // console.log('list_u: ', result);
      dispatch(loadingUsers(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerCheckContribuyenteExists = async (ci) => {
    dispatch(setLoading(true));
    try {
      const response = await checkContribuyenteExists(ci);
      return response.exists;
    } catch (error) {
      dispatch(setErrors({ ci: 'Error al verificar contribuyente' }));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlerGetContribuyenteInfo = async (ci) => {
    dispatch(setLoading(true));
    try {
      const response = await getContribuyenteInfo(ci);
      dispatch(setContribuyenteInfo(response));
      return response;
    } catch (error) {
      dispatch(setErrors({ ci: 'Error al obtener información del contribuyente' }));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlerRegisterUser = async (user) => {
    //let response;
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const response = await register(user);
      console.log('respuesta del registro: ', response.data);
      if (response && response.data) {
        dispatch(addUser(response.data));

        Swal.fire({
          title: 'Usuario creado!',
          text: 'Usuario creado con éxito',
          icon: 'success',
        });
  
        //Redirigir a login
        navigate('/login');

        return response.data;          // Asegúrar de que esto incluya el ID del usuario
      } else {
        throw new Error('La respuesta del servidor no contiene datos del usuario');
      }

    } catch (error) {
      if (error.response && error.response.status == 400) {
        //console.error('solicitud_incorrecta:',error.response.data);
        dispatch(loadingError(error.response.data));
      } else if (
        //500 -> error de server || 403 -> prohibido
        error.response &&
        error.response.status == 403 &&
        error.response.data?.message?.includes('constraint')
        ) {
          if (error.response.data?.message?.includes('users_ci_key')) {
            console.log({ci: 'El documento de identidad ya existe'});
            dispatch(loadingError({ username: 'El documento de identidad ya existe' }));
          }
          if (error.response.data?.message?.includes('users_email_key')) {
            console.log({email: 'El email ya existe'});
            dispatch(loadingError({ email: 'El email ya existe' }));
          }
      } else {
        //console.error('Error al registrar usuario:', error);
        dispatch(setErrors({ general: 'Error al registrar usuario' }));
        throw error;
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

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
      };

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
        //console.error('solicitud_incorrecta:',error.response.data);
        dispatch(loadingError(error.response.data));
      } else if (
        //500 -> error de server || 403 -> prohibido
        error.response &&
        error.response.status == 403 &&
        error.response.data?.message?.includes('constraint')
        ) {
          if (error.response.data?.message?.includes('users_username_key')) {
            console.log({username: 'El username ya existe'});
            dispatch(loadingError({ username: 'El username ya existe' }));
          }
          if (error.response.data?.message?.includes('users_email_key')) {
            console.log({email: 'El email ya existe'});
            dispatch(loadingError({ email: 'El email ya existe' }));
          }
      } else if (error.response?.status == 401) {
        //console.error('no_autorizado:',error.response.data);
        handlerLogout();

      } else {
        //console.log('pruebas pv');
        throw error;
      }
    }
  }

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
    }).then(async (result) => {
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
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerSelectedUserForm = (user) => {
    //console.log(user);
    //Se muestra form al seleccionar
    dispatch(onSelectedUserForm({ ...user }));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  const handlerClearContribuyenteInfo = () => {
    dispatch(clearContribuyenteInfo());
  };

  return {
    users,
    userSelected,
    visibleForm,
    errors,
    isLoading,
    paginator,
    contribuyenteExists,
    contribuyenteInfo,

    initialUserForm,
    getUsers,
    handlerRegisterUser,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,

    handlerCheckContribuyenteExists,
    handlerGetContribuyenteInfo,
    handlerClearContribuyenteInfo,
  };
};

export { useUsers };
