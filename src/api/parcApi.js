import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/parcs', // mets ici ton vrai backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllParcs = () => API.get('/');
export const getParcById = (id) => API.get(`/${id}`);
export const getParcsByGestionnaire = (id) => API.get(`/gestionnaire/${id}`);
export const createParc = (data) => API.post('/', data);
export const updateParc = (id, data) => API.put(`/${id}`, data);
