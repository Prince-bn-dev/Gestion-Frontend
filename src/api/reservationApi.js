import axios from 'axios';

const API_BASE_URL = 'https://gestion-backend-weld.vercel.app/api/reservations'; 

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const createReservation = async (data) => {
  const res = await axios.post(API_BASE_URL, data, { headers: getAuthHeaders() });
  return res.data;
};


export const payerReservation = async (reservationId, paiementData) => {
  const res = await axios.post(`${API_BASE_URL}/${reservationId}/payer`, paiementData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getAllReservations = async () => {
  const res = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
  return res.data;
};


export const updateReservation = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, data, { headers: getAuthHeaders() });
  return res.data;
} 


export const getReservationsByVoyageur = async (voyageurId) => {
  const res = await axios.get(`${API_BASE_URL}/voyageur/${voyageurId}`, { headers: getAuthHeaders() });
  return res.data;
};


export const getReservationById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};


export const deleteReservation = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
