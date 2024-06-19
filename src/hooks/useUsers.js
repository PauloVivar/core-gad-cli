import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';

const initialUsers = [
  {
    id: 1,
    username: 'Juan',
    email: 'juan.test@mail.com',
    password: '@dfgdgdffdghf@',
  },
];

//Se inicialeza id=0 para seleccionar y update.
const initialUserForm = {
  id: 0,
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

  //Navigate para redirigir a UsersPage
  const navigate = useNavigate();

  const handlerAddUser = (user) => {
    
    const type = (user.id === 0) ? 'addUser' : 'updateUser';

    dispatch({
      type,
      payload: user,
    });

    (user.id === 0) ? 
      Swal.fire({
        title: 'Usuario creado!',
        text: 'Usuario creado con éxito',
        icon: 'success'
      }) :
      Swal.fire({
        title: 'Usuario actualizado!',
        text: 'Usuario actualizo con éxito',
        icon: 'success'
    });

    //Form oculto y reseteado
    handlerCloseForm();

    //Redirigir a UsersPage
    navigate('/users');
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
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {

          /* Lógica para eliminar */
          dispatch({
            type: 'deleteUser',
            payload: id,
          });
          /* Lógica para eliminar */

          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario ha sido eliminado.',
            icon: 'success'
          });
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
  }

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  }

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,
  };
};

export { useUsers };
