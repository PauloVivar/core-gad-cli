import { useUsers } from '../../hooks/useUsers';

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
        <div className='flex items-center'>
          <h1 className='text-lg font-semibold md:text-2xl'>Usuarios</h1>
        </div>

        <div
          className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        >
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>No tiene usuarios</h3>
            <p className='text-sm text-muted-foreground'>
              Puede comenzar a crear usuarios tan pronto como agregues uno nuevo..
            </p>

          </div>
        </div>

        <div className='w-[90%] h-full m-4 justify-center items-center'>

          <div className='flex flex-row gap-4 justify-center'>
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

            <div className=''>
              {visibleForm || <Button onClick={handlerOpenForm}>Agregar Usuario</Button>}
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
        </div>
      </>
    </Layout>
  );
}

export { UsersPage };
