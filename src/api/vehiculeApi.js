import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vehicules'; 

 export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getVehicules = () => axios.get(API_URL, getAuthHeaders());

export const getVehiculeById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeaders());

export const createVehicule = (data) =>
  axios.post(API_URL, data, getAuthHeaders());

export const updateVehicule = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeaders());

export const deleteVehicule = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeaders());

export const getVehiculeByGestionnaire = (gestionnaireId) =>
  axios.get(`${API_URL}/gestionnaire/${gestionnaireId}`, getAuthHeaders());

export const getVehiculeByChauffeur = (chauffeurId) =>
  axios.get(`${API_URL}/chauffeur/${chauffeurId}`, getAuthHeaders());

