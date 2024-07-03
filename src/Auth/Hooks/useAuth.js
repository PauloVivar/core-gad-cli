import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginReducer } from '@/auth/reducers/loginReducer';
import { loginUser } from '../services/authService';
import Swal from 'sweetalert2';

//mod email
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};

function useAuth() {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);

  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {

    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split('.')[1]));  //atob -> decodificar base64
      //console.log(claims);

      //3 formas de obtener el username de token:
      //1.- response.data.username  2.- claims.username  3.- claims.sub (del payload de jwt)
      const user = { username: claims.sub };
      //const user = { username: 'admin' };

      dispatch({
        type: 'login',
        payload: { user, isAdmin: claims.isAdmin },
        //payload: user,
      });

      sessionStorage.setItem('login',
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user,
        })
      );
      sessionStorage.setItem('token', `Bearer ${token}`);
      navigate('/users');

    } catch(error) {
      if(error.response?.status == 401){
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'Username o password son incorrectos!',
        });
      }else if(error.response?.status == 403){
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'No tiene acceso al recurso o permisos!',
        });
      }else{
        throw error;
      }
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.clear();
  };

  return {
    login,
    handlerLogin,
    handlerLogout,
  };
}

export { useAuth };
