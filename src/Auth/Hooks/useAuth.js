//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/authService';
import { onLogin, onLogout, onInitLoading } from '@/store/slices/auth/authSlice';
import Swal from 'sweetalert2';

function useAuth() {
  //const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const dispatch = useDispatch();
  const { user, isAdmin, isAuth, isLoginLoading } = useSelector(state => state.auth);

  //const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      dispatch(onInitLoading());
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split('.')[1]));  //atob -> decodificar base64
      console.log(claims);

      //3 formas de obtener el username de token:
      //1.- response.data.username  2.- claims.username  3.- claims.sub (del payload de jwt)
      const user = {
        id: claims.userId,              //backend incluye userId en el token
        username: claims.sub 
      };
      //const user = { username: 'admin' };

      dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

      sessionStorage.setItem('login',
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user,
        })
      );
      sessionStorage.setItem('token', `Bearer ${token}`);
      return { isAuth: true, user };                 // test Devolvemos el objeto user con id y username
      //navigate('/users');

    } catch(error) {
      dispatch(onLogout());
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
      return { isAuth: false, user: null };    //test
    }
  };

  const handlerLogout = () => {
    dispatch(onLogout());
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.clear();
  };

  return {
    login: {
      user,
      isAdmin,
      isAuth,
      isLoginLoading,
    },
    handlerLogin,
    handlerLogout,
  };
}

export { useAuth };
