import axios from 'axios';

const resetPasswordApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/password`
});

// interceptor de la cabecera
// interceptor para añadir el token de autorización si es necesario
resetPasswordApi.interceptors.request.use( config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export { resetPasswordApi };
