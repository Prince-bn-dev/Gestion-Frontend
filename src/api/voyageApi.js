import axios from 'axios';

const API_URL = 'http://localhost:3000/api/voyages';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getVoyagesByGestionnaire = (id) => axios.get(`${API_URL}/gestionnaire/${id}`, getAuthHeaders());
export const getVoyagesByChauffeurVehicule= (id) => axios.get(`${API_URL}/chauffeur/${id}`,getAuthHeaders())
export const getAllVoyages = () => axios.get(API_URL);
export const getVoyageById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const createVoyage = (data) => axios.post(API_URL, data, getAuthHeaders());
export const updateVoyage = (id, data) => axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
export const deleteVoyage = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());
