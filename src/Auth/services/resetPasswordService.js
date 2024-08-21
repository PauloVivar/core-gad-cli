//import resetPasswordApi from 'resetPasswordApi';
//const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/password`;
import { resetPasswordApi } from '@/apis/resetPasswordApi';

//url viene por defecto de resetPasswordApi
const BASE_URL = '';

const requestPasswordReset = async (email) => {
  try {
    const response = await resetPasswordApi.post(`${BASE_URL}/reset-request`, { 
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud de restablecimiento de contraseña:', error);
    throw error;
  }
};

const resetPassword = async (code, newPassword) => {
  try {
    const response = await resetPasswordApi.post(`${BASE_URL}/reset`, { 
      code, 
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
};
export { requestPasswordReset, resetPassword };