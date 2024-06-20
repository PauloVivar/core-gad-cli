
import { UserContext } from './UserContext';
import { useUsers } from '@/hooks/useUsers';

const UserProvider = ({ children }) => {

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
    <UserContext.Provider value={{
      users,
      userSelected,
      initialUserForm,
      visibleForm,
      handlerAddUser,
      handlerDeleteUser,
      handlerSelectedUserForm,
      handlerOpenForm,
      handlerCloseForm
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
