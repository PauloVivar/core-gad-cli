
import { UserContext } from './UserContext';
import { useUsers } from '@/hooks/useUsers';

const UserProvider = ({ children }) => {

  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  } = useUsers();

  return (
    <UserContext.Provider value={{
      users,
      userSelected,
      initialUserForm,
      visibleForm,
      errors,
      handlerAddUser,
      handlerDeleteUser,
      handlerSelectedUserForm,
      handlerOpenForm,
      handlerCloseForm,
      getUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
