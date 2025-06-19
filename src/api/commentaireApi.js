import axios from 'axios';

const API_URL = 'https://gestion-backend-weld.vercel.app/api/commentaires'; 

export const getCommentairesByVoyage = (voyageId) =>
  axios.get(`${API_URL}/voyage/${voyageId}`);

export const createCommentaire = (commentaireData) =>
  axios.post(API_URL, commentaireData);

export const deleteCommentaire = (id) =>
  axios.delete(`${API_URL}/${id}`);
