import axios from 'axios';

const usersApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`
});

// interceptor de la cabecera
// interceptor para añadir el token de autorización si es necesario
usersApi.interceptors.request.use( config => {
  // config.headers = {
  //   ...config.headers,
  //   'Authorization': sessionStorage.getItem('token'),
  // };
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export { usersApi };
