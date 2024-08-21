import { Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/hooks/useAuth';

import { UserRoutes } from './routes/UserRoutes';
import { Skeleton } from './components/ui/skeleton';

import { LoginPage } from './auth/pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { AccountRecoveryPage } from './auth/pages/AccountRecoveryPage';

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
    <>
      {/* test */}
      <Navbar />
      <Routes>
        {login.isAuth ? ( <Route path='/*' element={<UserRoutes />}/>
        ) : (
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<LoginPage />} />
            <Route path='/recover-account' element={<AccountRecoveryPage />} />

            <Route path='/' element={<Home />} />
            <Route path='/*' element={<NotFound />} />
            {/* <Route path='/*' element={<Navigate to='/login' />} /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export { AppRoutes };
