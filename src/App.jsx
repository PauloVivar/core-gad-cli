import './App.css';
import { useReducer, useState } from 'react';
import { UserForm } from './components/UserForm';
import { UsersList } from './components/UsersList';
import { usersReducer } from './reducers/usersReducer';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialUsers = [
  {
    id: 1,
    username: 'Juan',
    email: 'juan.test@mail.com',
    password: '@dfgdgdffdghf@',
  },
];

//Se inicialeza id=0 para seleccionar y update.
const initialUserForm = {
  id: 0,
  username: '',
  email: '',
  password: '',
};

function App() {
  //Reducer para CRUD Front
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  //Estado para selecionar row de tabla usuarios para update
  const [userSelected, setUserSelected] = useState(initialUserForm);

  const handlerAddUser = (user) => {
    //console.log('en handlerAddUser ',user);
    let type;
    
    type = 'addUser';
    
    // if (user.id === 0){
    //   console.log('1')
    // }else{
    //   console.log('2')
    // }
    // console.log(user.id);
    // console.log(user.username);
    // console.log(user.email); 

    //type = 'updateUser'

    dispatch({
      //type: 'addUser',
      type,
      payload: user,
    });
  };

  const handlerDeleteUser = (id) => {
    //console.log(id);
    dispatch({
      type: 'deleteUser',
      payload: id,
    });
  };

  const handlerSelectedUserForm = (user) => {
    //console.log(user);
    setUserSelected({ ...user });
  };

  return (
    <>
      <div className='w-[90%] h-full m-4 justify-center items-center'>
        <h1 className='text-3xl font-bold underline'>Gad Azogues</h1>
        <div className='grid grid-cols-2 m-4 gap-4'>
          <div className=''>
            <UserForm
              initialUserForm={initialUserForm}
              handlerAddUser={handlerAddUser}
              userSelected={userSelected}
            />
          </div>
          <div className=''>
            {users.length === 0 ? (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Atención</AlertTitle>
                <AlertDescription>
                  No hay usuarios en el sistema, por favor crear un nuevo usuario.
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
