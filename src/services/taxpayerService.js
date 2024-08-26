import { taxpayersApi } from '@/apis/taxpayersApi';

//url viene por defecto de taxpayersApi
const BASE_URL = '';

const findAllPages = async (page = 0) => {
  try {
    const response = await taxpayersApi.get(`${BASE_URL}/page/${page}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const save = async (contribuyenteData) =>{
  try {
    return await taxpayersApi.post(BASE_URL, contribuyenteData);
  } catch (error) {
    throw error;
  }
}

const update = async (contribuyenteData) => {
  try {
    return await taxpayersApi.put(`${BASE_URL}/${id}`, contribuyenteData);
  } catch (error) {
    throw error;
  }
}

const checkContribuyenteExists = async (ci) => {
  try {
    const response = await taxpayersApi.get(`${BASE_URL}/check/${ci}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar contribuyente:', error);
    throw error;
  }
};

const getContribuyenteInfo = async (ci) => {
  try {
    const response = await taxpayersApi.get(`${BASE_URL}/${ci}`);
    //console.log('validado desde texayerService getContribuyenteInfo: ', response.data)
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del contribuyente:', error);
    throw error;
  }
};

export { 
  findAllPages, 
  save, 
  update, 
  checkContribuyenteExists, 
  getContribuyenteInfo,
};
