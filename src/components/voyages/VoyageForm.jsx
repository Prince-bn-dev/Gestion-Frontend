import React, { useEffect, useState } from 'react';
import { createVoyage, updateVoyage, getVoyageById } from '../../api/voyageApi';
import { getVehiculeByGestionnaire } from '../../api/vehiculeApi';
import { getAllTrajets } from '../../api/trajetApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function VoyageForm({ id, onClose }) {
  const [formData, setFormData] = useState({
    vehicule: '',
    trajet: '',
    date_depart: '',
    heure_depart: '',
    heure_arrivee_Estime: '',
    prix_par_place: '',
    statut: 'Pas_démarrer',
  });

  const [vehicules, setVehicules] = useState([]);
  const [trajets, setTrajets] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const res = await getVehiculeByGestionnaire(user._id);
        setVehicules(res.data);
      } catch (err) {
        console.log('Erreur lors du chargement des véhicules');
      }
    };

    const fetchTrajets = async () => {
      try {
        const res = await getAllTrajets();
        setTrajets(res.data);
      } catch (err) {
        console.log('Erreur lors du chargement des trajets');
      }
    };

    const fetchVoyage = async () => {
      if (id) {
        try {
          const res = await getVoyageById(id);
          setFormData({
            vehicule: res.data.vehicule?._id || '',
            trajet: res.data.trajet?._id || '',
            date_depart: res.data.date_depart?.slice(0, 10) || '',
            heure_depart: res.data.heure_depart || '',
            heure_arrivee_Estime: res.data.heure_arrivee_Estime || '',
            prix_par_place: res.data.prix_par_place || '',
            statut: res.data.statut || 'Pas_démarrer',
          });
        } catch {
          console.log('Voyage introuvable');
        }
      }
    };

    fetchVehicules();
    fetchTrajets();
    fetchVoyage();
  }, [id, user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateVoyage(id, formData);
        console.log('Voyage mis à jour avec succès');
      } else {
        await createVoyage(formData);
        console.log('Voyage créé avec succès');
      }
      navigate('/voyages');
    } catch (error) {
      console.log('Erreur lors de la soumission du formulaire');
    } finally {
      if (onClose) onClose();
    }
  };

  return (
    <div className="voyage-form-container">
      <h2>{id ? 'Modifier le Voyage' : 'Créer un Voyage'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Véhicule</label>
        <select name="vehicule" value={formData.vehicule} onChange={handleChange} required>
          <option value="">-- Choisir un véhicule --</option>
          {vehicules.map(v => (
            <option key={v._id} value={v._id}>
              {v.marque} - {v.immatriculation}
            </option>
          ))}
        </select>

        <label>Trajet (Destination)</label>
        <select name="trajet" value={formData.trajet} onChange={handleChange} required>
          <option value="">-- Choisir un trajet --</option>
          {trajets.map(t => (
            <option key={t._id} value={t._id}>
              {t.lieux_depart} → {t.lieux_arrive}
            </option>
          ))}
        </select>

        <label>Date de départ</label>
        <input type="date" name="date_depart" value={formData.date_depart} onChange={handleChange} required />

        <label>Heure de départ</label>
        <input type="time" name="heure_depart" value={formData.heure_depart} onChange={handleChange} required />

        <label>Heure estimée d'arrivée</label>
        <input type="time" name="heure_arrivee_Estime" value={formData.heure_arrivee_Estime} onChange={handleChange} required />

        <label>Prix par place</label>
        <input type="number" name="prix_par_place" value={formData.prix_par_place} onChange={handleChange} required />

        <label>Statut</label>
        <select name="statut" value={formData.statut} onChange={handleChange}>
          <option value="Pas_démarrer">Pas démarré</option>
          <option value="Pret_a_démarrer">Prêt à démarrer</option>
          <option value="terminé">Terminé</option>
          <option value="annule">Annulé</option>
        </select>

        <button type="submit">{id ? 'Mettre à jour' : 'Créer'}</button>
      </form>
    </div>
  );
}

export default VoyageForm;
