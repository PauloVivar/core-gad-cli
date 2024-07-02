import axios from 'axios';

//viene de useAuth
//mod email
const loginUser = async ({ username, password }) => {
  try {
    return await axios.post('http://localhost:8080/login', {
      username,
      password,
    });
  } catch (error) {
    throw error;
  }
  //return userLogin.username === 'admin' && userLogin.password === '12345' ? true : false;
};

export { loginUser };
