import axios from 'axios';

//viene de useAuth
//mod email
const loginUser = async ({ username, password }) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      username,
      password,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  //return userLogin.username === 'admin' && userLogin.password === '12345' ? true : false;
};

export { loginUser };
