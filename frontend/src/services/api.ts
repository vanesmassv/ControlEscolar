import axios from 'axios';
import { TokenService } from './TokenService'; 

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

// ESTO ES LO QUE TE FALTA (El Interceptor)
api.interceptors.request.use((config) => {
  // 1. Buscamos el token guardado
  const token = TokenService.getToken(); 
  
  // 2. Si existe, lo pegamos en la cabecera
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;