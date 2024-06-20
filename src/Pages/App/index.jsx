import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../Auth/Context/AuthContext';
import { LoginPage } from '../../Auth/Pages/LoginPage';
import { UserRoutes } from '../../Routes/UserRoutes';

import './App.css';

function App() {

 const { login } = useContext(AuthContext);

  return (
    <Routes>
        {
          login.isAuth
            ? (
                <Route path='/*' element={<UserRoutes />} />
              )
            : <>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/*' element={<Navigate to='/login' />} />
              </>
        }
    </Routes>
  );
}

export default App;
