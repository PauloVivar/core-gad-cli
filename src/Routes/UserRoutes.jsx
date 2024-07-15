
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
//import { Navbar } from '../components/Navbar';
import { SelectRegisterPage } from '../pages/SelectRegisterPage';
import { UsersPage } from '../pages/UsersPage';
import { Home } from '@/pages/Home';
import { TermsPage } from '@/pages/TermsPage';

function UserRoutes() {

  const { login } = useAuth();

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='users/page/:page' element={<UsersPage />} />
 
        {!login.isAdmin ||
        <>
          <Route path='users/selectRegister' element={<SelectRegisterPage />} />
          <Route path='users/edit/:id' element={<SelectRegisterPage />} />
          <Route path='terms' element={<TermsPage />} />
        </>
        }
        {/* <Route path='/' element={<Navigate to='/users' />} /> */}
        <Route path='/' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export { UserRoutes };
