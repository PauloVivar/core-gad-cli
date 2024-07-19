import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/auth/hooks/useAuth';

import { 
  findAll, 
  remove, 
  save, 
  update,

  findLatestTerm,
  checkUserTermsStatus,
  recordTermsInteraction,
} from '@/services/termsService';
import {
  initialTermForm,
  addTerm,
  removeTerm,
  updateTerm,
  loadingTerms,
  onSelectedTermForm,
  onOpenForm,
  onCloseForm,

  fetchLatestTermStart,
  fetchLatestTermSuccess,
  fetchLatestTermError,

  setUserTermsStatus,
  recordTermsInteractionStart,
  recordTermsInteractionSuccess,
  recordTermsInteractionError,

  loadingError,
} from '@/store/slices/terms/termsSlice';

import Swal from 'sweetalert2';

const useTerms = () => {

  const { handlerLogout } = useAuth();

  const navigate = useNavigate();

  //Redux para CRUD en el Frond
  const { 
    terms,
    termSelected,
    visibleForm,
    errors,

    latestTerm,
    latestTermError,

    userTermsStatus,
    recordingTermsInteraction,
    recordingTermsInteractionError,
    isLoading,
  } = useSelector((state) => state.terms);

  const dispatch = useDispatch();

  const getTerms = async () => {
    try {
      const result = await findAll();
      //console.log('list_t: ', result);
      dispatch(loadingTerms(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddTerm = async (term) => {
    let response;
    try {
      if (term.id === 0) {
        response = await save(term);
        dispatch(addTerm(response.data));
      } else {
        response = await update(term);
        dispatch(updateTerm(response.data));
      }

      term.id === 0
        ? Swal.fire({
            title: 'Términos y Condiciones creado!',
            text: 'Términos y Condiciones creado con éxito',
            icon: 'success',
          })
        : Swal.fire({
            title: 'Términos y Condiciones actualizado!',
            text: 'Términos y Condiciones actualizo con éxito',
            icon: 'success',
          });

      //Form oculto y reseteado
      handlerCloseForm();
      //Redirigir a TermsPage
      navigate('/terms');

    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingError(error.response.data));
      } else if (error.response?.status == 401) {
        //console.error('no_autorizado:',error.response.data);
        handlerLogout();
      } else {
        //console.log('pruebas pv');
        throw error;
      }
    }
  }

  const handlerDeleteTerm = (id) => {
    //console.log(id);
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Este Término y Condición será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // eliminar de la db -> Lógica para eliminar
          await remove(id);
          dispatch(removeTerm(id));

          Swal.fire({
            title: 'Eliminado!',
            text: 'Término y Condición ha sido eliminado.',
            icon: 'success',
          });
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerSelectedTermForm = (term) => {
    //Se muestra form al seleccionar
    dispatch(onSelectedTermForm({ ...term }));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  // Función asíncrona para obtener los últimos términos
  const getLatestTerms = async () => {
    dispatch(fetchLatestTermStart());
    try {
      const result = await findLatestTerm();
      dispatch(fetchLatestTermSuccess(result.data));
    } catch (error) {
      dispatch(fetchLatestTermError(error.message));
    }
  };

  // Función asíncrona para checkear el estado de términos de usuario
  const getCheckUserTermsStatus = async (userId) => {
    try {
      const result = await checkUserTermsStatus(userId);
      dispatch(setUserTermsStatus(result.data));
    } catch (error) {
      console.error('Error checking user terms status:', error);
      dispatch(loadingError(error.message));
    }
  };

  // Función asíncrona para registrar la interacción de términos
  const getRecordTermsInteraction = async (userId, accepted, ipAddress) => {
    dispatch(recordTermsInteractionStart());
    try {
      const result = await recordTermsInteraction(userId, accepted, ipAddress);
      dispatch(recordTermsInteractionSuccess(result.data));
    } catch (error) {
      dispatch(recordTermsInteractionError(error.message));
      throw error;
    }
  };

  return {
    initialTermForm,
    terms,
    termSelected,
    visibleForm,
    errors,
    latestTerm,
    latestTermError,
    userTermsStatus,
    recordingTermsInteraction,
    recordingTermsInteractionError,
    isLoading,
    
    getTerms,
    handlerAddTerm,
    handlerDeleteTerm,
    handlerSelectedTermForm,
    handlerOpenForm,
    handlerCloseForm,

    getLatestTerms,
    getCheckUserTermsStatus,
    getRecordTermsInteraction,
  };
};

export { useTerms };
