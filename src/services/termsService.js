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

// Función para guardar en caché findLatestTerm y checkUserTermsStatus
const setCacheItem = (key, value, ttl) => {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Función para obtener de caché findLatestTerm y checkUserTermsStatus
const getCacheItem = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

// Función para obtener los últimos términos con caché
const findLatestTerm = async () => {
  const cacheKey = 'latestTerms';
  const cachedTerms = getCacheItem(cacheKey);

  if (cachedTerms !== null) {
    return { data: cachedTerms };
  }

  try {
    const response = await termsApi.get(`${BASE_URL}/latest`);

    // Cachear el resultado por 1 hora (3600000 ms)
    setCacheItem(cacheKey, response.data, 3600000);
    
    return response;

  } catch (error) {
    console.error('Error service al obtener el último término:', error);
    throw error;
  }
}

// Función para verificar el estado de los términos con caché
const checkUserTermsStatus = async ({ userId }) => {
  const cacheKey = `userTermsStatus_${userId}`;
  const cachedStatus = getCacheItem(cacheKey);

  if (cachedStatus !== null) {
    return { data: cachedStatus };
  }

  try {
    const response = await termsApi.get(`${BASE_URL}/status/${userId}`);
    
    // Cachear el resultado por 5 minutos (300000 ms)
    setCacheItem(cacheKey, response.data, 300000);
    
    return response;

  } catch (error) {
    console.error('Error service al comprobar el estado de los términos de usuario:', error);
    throw error;
  }
};

// Función para registrar la interacción de términos (sin caché)
const recordTermsInteraction = async (userId, accepted) => {
  try {
    const response = await termsApi.post(`${BASE_URL}/record`, { 
      userId, 
      accepted,
    });

    // Actualizar el caché después de una interacción exitosa
    setCacheItem(`userTermsStatus_${userId}`, accepted, 300000);

    return response;

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
