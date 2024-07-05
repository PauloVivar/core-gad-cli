import axios from 'axios';

const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`
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
