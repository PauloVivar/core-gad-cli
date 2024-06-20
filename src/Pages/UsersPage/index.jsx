import { useContext } from 'react';
import { UserContext } from '@/Context/UserContext';

import { Layout } from '../../components/Layout';
import { UserForm } from '../../components/UserForm';
import { UsersList } from '../../components/UsersList';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

function UsersPage() {
  
  const {
    users,
    userSelected, //ojo
    visibleForm,
    handlerOpenForm,
    handlerCloseForm, //ojo
  } = useContext(UserContext);

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
              {visibleForm || <Button className='mb-2' onClick={handlerOpenForm}>Agregar Usuario</Button>}
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
