import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../../api/vehiculeApi';
import { toast } from 'react-toastify';

const AddChauffeurToVehicule = ({ vehiculeId }) => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [selectedChauffeur, setSelectedChauffeur] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChauffeurs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/chauffeurs`, {
          headers: getAuthHeaders().headers,
        });
        setChauffeurs(res.data);
        toast.success('Chargement réussie')
      } catch (err) {
        toast.error('Erreur lors du chargement des chauffeurs');
      }
    };
    fetchChauffeurs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedChauffeur) {
      toast.error('Veuillez sélectionner un chauffeur');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/vehicules/chauffeur/${vehiculeId}`,
        { chauffeurId: selectedChauffeur },
        {
          headers: getAuthHeaders().headers,
        }
      );
      toast.success('Chauffeur associé avec succès');
      setSelectedChauffeur('');
    } catch (err) {
      toast.error("Erreur lors de l'ajout du chauffeur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="association-container">
      <h3>Associer un chauffeur au véhicule</h3>
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
              {chauffeur.nom
                ? `${chauffeur.prenom || ''} ${chauffeur.nom}`
                : chauffeur.email}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter le chauffeur'}
        </button>
      </form>
    </div>
  );
};

export default AddChauffeurToVehicule;
