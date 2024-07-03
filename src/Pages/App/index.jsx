import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../auth/context/AuthContext';
import { LoginPage } from '../../auth/pages/LoginPage';
import { UserRoutes } from '../../routes/UserRoutes';

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
