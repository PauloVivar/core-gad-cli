import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1/users'
});

//interceptor de la cabecera
usersApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    'Authorization': sessionStorage.getItem('token'),
  };
  return config;
});

export { usersApi };
