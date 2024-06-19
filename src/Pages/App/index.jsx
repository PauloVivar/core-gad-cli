
import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoginPage } from '../LoginPage';
import { UsersPage } from '../UsersPage';

import { loginReducer } from '../../reducers/loginReducer';
import { Navbar } from '../../components/Navbar';

import Swal from 'sweetalert2';
import './App.css';

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth: false,
  user: undefined,
};

function App() {
  const [login, dispach] = useReducer(loginReducer, initialLogin);

  const handlerLogin = ({ email, password }) => {
    if (email === 'admin@mail.com' && password === '12345') {
      const user = { email: 'admin@mail.com' };
      dispach({
        type: 'login',
        payload: user,
      });

      sessionStorage.setItem('login', JSON.stringify({
        isAuth: true,
        user,
      }));


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error Login!',
        text: 'Email o password son incorrectos!',
      });
    }
  };

  const handlerLogout = () =>{
    dispach({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
  }

  return (
    <>
      <BrowserRouter>
        {
          login.isAuth
          ? <>
            <Navbar handlerLogout={ handlerLogout } />
            <UsersPage /> 
          </>
          : <LoginPage handlerLogin={ handlerLogin } />
        }
      </BrowserRouter>
    </>
  );
}

export default App;
