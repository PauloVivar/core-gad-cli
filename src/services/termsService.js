import { termsApi } from '@/apis/termsApi';

//url viene por defecto de termsApi
const BASE_URL = '';

const findAll = async () => {
  try {
    const response = await termsApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const save = async ({ version, content, effectiveDate }) => {
  try {
    return await termsApi.post(BASE_URL, {
      version,
      content,
      effectiveDate,
    });
  } catch (error) {
    console.error('Error service al guardar el término:', error);
    throw error;
  }
}

const update = async ({ id, version, content, effectiveDate }) => {
  try {
    return await termsApi.put(`${BASE_URL}/${id}`, {
      version,
      content,
      effectiveDate,
      //password: 'nothing',  //lo realiza el backend UserRequest
    });
  } catch (error) {
    console.error('Error service al actualizar el término:', error);
    throw error;
  }
}

const remove = async (id) => {
  try {
    return await termsApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error service al eliminar el término:', error);
    throw error;
  }
}

const findLatestTerm = async () => {
  try {
    const response = await termsApi.get(`${BASE_URL}/latest`);
    return response;
  } catch (error) {
    console.error('Error service al obtener el último término:', error);
    throw error;
  }
}

const checkUserTermsStatus = async ({ userId }) => {
  try {
    const response = await termsApi.get(`${BASE_URL}/status/${userId}`);
    return response;
  } catch (error) {
    console.error('Error service al comprobar el estado de los términos de usuario:', error);
    throw error;
  }
};

const recordTermsInteraction = async (userId, accepted) => {
  try {
    console.log('test8', userId);
    console.log('test9', accepted);
    return await termsApi.post(`${BASE_URL}/record`, { 
      userId, 
      accepted,
    });
  } catch (error) {
    console.error('Error service al registrar la interacción de términos:', error);
    throw error;
  }
};

export { 
  findAll, 
  save, 
  update, 
  remove, 
  findLatestTerm, 
  checkUserTermsStatus, 
  recordTermsInteraction 
};
