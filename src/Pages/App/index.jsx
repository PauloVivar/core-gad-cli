
import { LoginPage } from '../../Auth/Pages/LoginPage';
import { useAuth } from '../../Auth/Hooks/useAuth';

import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoutes } from '../../Routes/UserRoutes';
import './App.css';

function App() {

  //Custom Hook
  const { login, handlerLogin, handlerLogout } = useAuth();

  return (
    <Routes>
        {
          login.isAuth
            ? (
                <Route path='/*' 
                  element={ <UserRoutes login={login} handlerLogout={handlerLogout} /> }
                />
              )
            : <>
                <Route path='/login'
                  element={ <LoginPage handlerLogin={handlerLogin} />}
                />
                <Route path='/*' 
                  element={ <Navigate to='/login' /> } 
                />
              </>
        }
    </Routes>
  );
}

export default App;
