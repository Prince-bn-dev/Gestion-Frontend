import axios from 'axios';

const API_BASE_URL = 'https://gestion-backend-weld.vercel.app/api/paiements';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createPaiement = async ( paiementData) => {
  const res = await axios.post(`${API_BASE_URL}`, paiementData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
export const getPaiementByReservation = async (reservationId) => {
  const res = await axios.get(`${API_BASE_URL}/reservation/${reservationId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
export const getAllPaiements = async () => {
  const res = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
  return res.data;
};
export const getPaiementsByVoyageur = async () => {
  const res = await axios.get(`${API_BASE_URL}/voyageur`, { headers: getAuthHeaders() });
  return res.data;
};

export const getPaiementById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
export const deletePaiement = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
export const updatePaiement = async (id, paiementData) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, paiementData, { headers: getAuthHeaders() });
  return res.data;
};