import { useContext, useEffect } from 'react';
import { UserContext } from '@/Context/UserContext';

import { Layout } from '../../Components/Layout';
import { UserForm } from '../../Components/UserForm';
import { UsersList } from '../../Components/UsersList';

import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@/Auth/Context/AuthContext';

function UsersPage() {
  
  const {
    users,
    userSelected, //ojo
    visibleForm,
    handlerOpenForm,
    handlerCloseForm, //ojo
    getUsers,
  } = useContext(UserContext);

  const { login } = useContext(AuthContext);

  useEffect( ()=>{
    getUsers();
  }, []);

  return (
    <Layout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Usuarios</h1>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4'>
        <div className='flex flex-col items-center gap-1'>

          <div className='w-[95%] h-full m-4 flex flex-row justify-center gap-4'>
            {!visibleForm || (
              <UserForm
                userSelected={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
            )}

            <div className='text-left'>
              {(visibleForm || !login.isAdmin) || <Button 
                className='mb-2' onClick={handlerOpenForm}>Agregar Usuario</Button>}
              {users.length === 0 ? (
                <Alert variant='destructive'>
                  <ExclamationCircleIcon className='size-5'/>
                  <AlertTitle>Atención</AlertTitle>
                  <AlertDescription>
                    No hay usuarios en el sistema, por favor crear un nuevo registro.
                  </AlertDescription>
                </Alert>
              ) : (
                <UsersList />
              )}
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export { UsersPage };
