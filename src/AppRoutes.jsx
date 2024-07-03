import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';

import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';

const AppRoutes = () => {
  const { login } = useAuth();

  return (
    <Routes>
      {login.isAuth ? (
        <Route
          path='/*'
          element={<UserRoutes />}
        />
      ) : (
        <>
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/*'
            element={<Navigate to='/login' />}
          />
        </>
      )}
    </Routes>
  );
};

export { AppRoutes };
