import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginReducer } from '@/Auth/reducers/loginReducer';
import { authService } from '../services/authService';
import Swal from 'sweetalert2';


const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: undefined,
};

function useAuth() {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);

  const navigate = useNavigate();

  const handlerLogin = ({ email, password }) => {

    const isLogin = authService({ email, password });
    if(isLogin) {
      const user = { email: 'admin@mail.com' };
      dispatch({
        type: 'login',
        payload: user,
      });

      sessionStorage.setItem(
        'login',
        JSON.stringify({
          isAuth: true,
          user,
        })
      );
      navigate('/users');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error Login!',
        text: 'Email o password son incorrectos!',
      });
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
  };

  return {
    login,
    handlerLogin,
    handlerLogout,
  };
}

export { useAuth };
