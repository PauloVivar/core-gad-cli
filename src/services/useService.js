import axios from 'axios';

//url api
const BASE_URL = 'http://localhost:8080/api/v1/users';

const config = () => {
  return {
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    }
  }
}

const findAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

const save = async ({ username, email, password, admin }) =>{
  try {
    return await axios.post(BASE_URL, {
      username,
      email,
      password,
      admin,
    }, config());
  } catch (error) {
    throw error;
  }
}

const update = async ({ id, username, email, admin }) => {
  try {
    return await axios.put(`${BASE_URL}/${id}`, {
      username,
      email,
      admin,
      //password: 'nothing',  //lo realiza el backend UserRequest
    }, config());
  } catch (error) {
    throw error;
  }
}

const remove = async (id) => {
  try {
    return await axios.delete(`${BASE_URL}/${id}`, config());
  } catch (error) {
    throw error;
  }
}

export { findAll, save, update, remove };
