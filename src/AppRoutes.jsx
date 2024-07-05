import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';

import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';
import { Skeleton } from './components/ui/skeleton';

const AppRoutes = () => {
  const { login } = useAuth();

  if(login.isLoginLoading){
    return(
      <div className='w-full h-screen flex flex-col space-y-3 justify-center items-center'>
        <Skeleton className='h-[125px] w-[400px] rounded-xl bg-slate-200' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[400px] bg-slate-200' />
          <Skeleton className='h-4 w-[350px] bg-slate-200' />
          <Skeleton className='h-4 w-[100px] bg-slate-200' />
        </div>
      </div>
    );
  }

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
