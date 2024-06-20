import { Navigate, Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../Pages/RegisterPage';
import { UsersPage } from '../Pages/UsersPage';
import { Navbar } from '../components/Navbar';
import { UserProvider } from '../Context/UserProvider';


function UserRoutes() {

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='users' element={<UsersPage />} />
          <Route path='users/register' element={<RegisterPage />} />
          <Route path='users/edit/:id' element={<RegisterPage />} />
          <Route path='/' element={<Navigate to='/users' />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export { UserRoutes };
