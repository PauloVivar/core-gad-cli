import { usersApi } from '@/apis/usersApi';

//url viene por defecto de usersApi
const BASE_URL = '';

const findAll = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const save = async ({ username, email, password, admin }) =>{
  try {
    return await usersApi.post(BASE_URL, {
      username,
      email,
      password,
      admin,
    });
  } catch (error) {
    throw error;
  }
}

const update = async ({ id, username, email, admin }) => {
  try {
    return await usersApi.put(`${BASE_URL}/${id}`, {
      username,
      email,
      admin,
      //password: 'nothing',  //lo realiza el backend UserRequest
    });
  } catch (error) {
    throw error;
  }
}

const remove = async (id) => {
  try {
    return await usersApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
}

export { findAll, save, update, remove };
