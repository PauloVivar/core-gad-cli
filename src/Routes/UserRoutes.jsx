
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../Context/UserProvider';
import { AuthContext } from '@/Auth/Context/AuthContext';

import { Navbar } from '../Components/Navbar';

import { RegisterPage } from '../Pages/RegisterPage';
import { UsersPage } from '../Pages/UsersPage';

function UserRoutes() {

  const { login } = useContext(AuthContext);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='users' element={<UsersPage />} />
          {!login.isAdmin ||
          <>
            <Route path='users/register' element={<RegisterPage />} />
            <Route path='users/edit/:id' element={<RegisterPage />} />
          </>
          }
          <Route path='/' element={<Navigate to='/users' />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export { UserRoutes };
