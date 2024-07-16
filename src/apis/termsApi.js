import axios from 'axios';

const termsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/terms`
});

//interceptor de la cabecera
termsApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    'Authorization': sessionStorage.getItem('token'),
  };
  return config;
});

export { termsApi };
