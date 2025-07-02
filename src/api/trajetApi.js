import axios from 'axios';

const API_URL = 'https://gestion-backend-weld.vercel.app/api/trajets'; 

 export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const getAllTrajets = () => axios.get(API_URL, getAuthHeaders());