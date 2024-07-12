import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/auth/hooks/useAuth';
import { findAll, remove, save, update, getLatestTerms, acceptTerms } from '@/services/termsService';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLatestTerms, 
  setAcceptanceStatus, 
  setStatus, 
  setError,
} from '@/store/slices/terms/termsSlice';

const useTerms = () => {

  // Función asíncrona para obtener los últimos términos
  const getLatestTerms = () => async dispatch => {
    dispatch(setStatus('loading'));
    try {
      const response = await fetch('/api/terms/latest'); // Suponiendo que esta es tu API
      const data = await response.json();
      dispatch(setLatestTerms(data));
    } catch (error) {
      dispatch(setError(error.toString()));
    }
  };

  // Función asíncrona para aceptar los términos
  const acceptTerms = () => async dispatch => {
    dispatch(setStatus('loading'));
    try {
      const response = await fetch('/api/terms/accept', { method: 'POST' });
      if (response.ok) {
        dispatch(setAcceptanceStatus());
      } else {
        throw new Error('Failed to accept terms');
      }
    } catch (error) {
      dispatch(setError(error.toString()));
    }
  };

  return {
    getLatestTerms,
    acceptTerms,
  };
};

export { useTerms };
