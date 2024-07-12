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

const getLatestTerms = async () => {
  try {
    const response = await termsApi.get(`${BASE_URL}/latest`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const acceptTerms = async ({ userId, accepted, ipAddress }) => {
  try {
    const response = await termsApi.get(`${BASE_URL}/record`, {
      userId,
      accepted,
      ipAddress,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const save = async ({ version, content, effectiveDate }) =>{
  try {
    return await termsApi.post(BASE_URL, {
      version,
      content,
      effectiveDate,
    });
  } catch (error) {
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
    throw error;
  }
}

const remove = async (id) => {
  try {
    return await termsApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
}

export { findAll, save, update, remove, getLatestTerms, acceptTerms };
