import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../../api/vehiculeApi';

const AddChauffeurToVehicule = ({ vehiculeId }) => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [selectedChauffeur, setSelectedChauffeur] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchChauffeurs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/chauffeurs`);
        setChauffeurs(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des chauffeurs');
      }
    };
    fetchChauffeurs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!selectedChauffeur) {
      setError('Veuillez sélectionner un chauffeur');
      return;
    }
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}api/vehicules/chauffeur/${vehiculeId}`, {
        chauffeurId: selectedChauffeur,
      },getAuthHeaders(),{new:true});
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'ajout du chauffeur');
    }
  };

  return (
 <div className="association-container">
  <h3>Associer un chauffeur au véhicule</h3>
  {message && <p className="success">{message}</p>}
  {error && <p className="error">{error}</p>}
  <form onSubmit={handleSubmit}>
    <label htmlFor="chauffeur-select">Choisir un chauffeur :</label>
    <select
      id="chauffeur-select"
      value={selectedChauffeur}
      onChange={(e) => setSelectedChauffeur(e.target.value)}
      required
    >
      <option value="">-- Sélectionner --</option>
      {chauffeurs.map((chauffeur) => (
        <option key={chauffeur._id} value={chauffeur._id}>
          {chauffeur.name || chauffeur.email}
        </option>
      ))}
    </select>
    <button type="submit">Ajouter Chauffeur</button>
  </form>
</div>
  );
};

export default AddChauffeurToVehicule;
