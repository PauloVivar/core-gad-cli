import './App.css';
import { useUsers } from './hooks/useUsers';

import { UserForm } from './components/UserForm';
import { UsersList } from './components/UsersList';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

function App() {

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
    <>
      <div className='w-[90%] h-full m-4 justify-center items-center'>
        <h1 className='text-3xl font-bold underline'>Gad Azogues</h1>

        <div className='flex flex-row gap-4 justify-center'>
          
            {!visibleForm ||
              <div className=''>
                <UserForm
                  initialUserForm={initialUserForm}
                  userSelected={userSelected}
                  handlerAddUser={handlerAddUser}
                  handlerCloseForm={handlerCloseForm}
                />
              </div>
            }
          
          <div className=''>
            {visibleForm ||
              <Button onClick={handlerOpenForm}>Agregar Usuario</Button>
            }
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
  );
}

export default App;
