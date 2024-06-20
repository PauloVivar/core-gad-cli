
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

  //Custom Hook
  const { login, handlerLogin, handlerLogout } = useAuth();

  return (
    <AuthContext.Provider value={{
      login,
      handlerLogin,
      handlerLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
