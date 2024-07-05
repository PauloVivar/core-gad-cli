
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';

import { Navbar } from '../components/Navbar';

import { RegisterPage } from '../pages/RegisterPage';
import { UsersPage } from '../pages/UsersPage';


function UserRoutes() {

  const { login } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='users' element={<UsersPage />} />
        <Route path='users/page/:page' element={<UsersPage />} />
        {!login.isAdmin ||
        <>
          <Route path='users/register' element={<RegisterPage />} />
          <Route path='users/edit/:id' element={<RegisterPage />} />
        </>
        }
        <Route path='/' element={<Navigate to='/users' />} />
      </Routes>
    </>
  );
}

export { UserRoutes };
