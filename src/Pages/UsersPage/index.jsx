import { useUsers } from '../../Hooks/useUsers';

import { Layout } from '../../components/Layout';
import { UserForm } from '../../components/UserForm';
import { UsersList } from '../../components/UsersList';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

function UsersPage() {
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,
  } = useUsers();

  return (
    <Layout>
      <>
        <div className='w-[95%] h-full m-4 flex flex-row justify-center gap-4'>
          {!visibleForm || (
            <div className=''>
              <UserForm
                initialUserForm={initialUserForm}
                userSelected={userSelected}
                handlerAddUser={handlerAddUser}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          )}

          <div className='text-left'>
            {visibleForm || <Button className='mb-2' onClick={handlerOpenForm}>Agregar Usuario</Button>}
            {users.length === 0 ? (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Atención</AlertTitle>
                <AlertDescription>
                  No hay usuarios en el sistema, por favor crear un nuevo registro.
                </AlertDescription>
              </Alert>
            ) : (
              <UsersList
                users={users}
                handlerDeleteUser={handlerDeleteUser}
                handlerSelectedUserForm={handlerSelectedUserForm}
              />
            )}
          </div>
        </div>
      </>
    </Layout>
  );
}

export { UsersPage };
