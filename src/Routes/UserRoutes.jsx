import { UsersPage } from '../Pages/UsersPage';
import { Navbar } from '../components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

function UserRoutes({ login, handlerLogout }) {
  return (
    <>
      <Navbar
        login={login}
        handlerLogout={handlerLogout}
      />
      <Routes>
        <Route
          path='users'
          element={<UsersPage />}
        />
        <Route
          path='/'
          element={<Navigate to='/users' />}
        />
      </Routes>
    </>
  );
}

export { UserRoutes };
