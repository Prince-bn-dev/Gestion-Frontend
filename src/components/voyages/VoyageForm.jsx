import React, { useEffect, useState } from 'react';
import { createVoyage, updateVoyage, getVoyageById } from '../../api/voyageApi';
import { getVehiculeByGestionnaire } from '../../api/vehiculeApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function VoyageForm() {
  const { id } = useParams(); // Si présent => modification
  const [formData, setFormData] = useState({
    vehicule: '',
    destination: '',
    date_depart: '',
    heure_depart: '',
    heure_arrivee_Estime: '',
    prix_par_place: '',
    statut: 'encours',
  });
  const [vehicules, setVehicules] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const res = await getVehiculeByGestionnaire(user._id);
        setVehicules(res.data);
      } catch (err) {
        toast.error('Erreur lors du chargement des véhicules');
      }
    };

    const fetchVoyage = async () => {
      if (id) {
        try {
          const res = await getVoyageById(id);
          setFormData({
            vehicule: res.data.vehicule?._id,
            destination: res.data.destination,
            date_depart: res.data.date_depart.slice(0, 10),
            heure_depart: res.data.heure_depart,
            heure_arrivee_Estime: res.data.heure_arrivee_Estime,
            prix_par_place: res.data.prix_par_place,
            statut: res.data.statut,
          });
        } catch {
          toast.error('Voyage introuvable');
        }
      }
    };

    fetchVehicules();
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
        toast.success('Voyage mis à jour avec succès');
      } else {
        await createVoyage(formData);
        toast.success('Voyage créé avec succès');
      }
      navigate('/voyages');
    } catch (error) {
      toast.error('Erreur lors de la soumission du formulaire');
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
            <option key={v._id} value={v._id}>{v.marque} - {v.immatriculation}</option>
          ))}
        </select>

        <label>Destination</label>
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />

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
          <option value="nonInitier">Non initié</option>
          <option value="encours">En cours</option>
          <option value="termine">Terminé</option>
          <option value="annule">Annulé</option>
        </select>

        <button type="submit">{id ? 'Mettre à jour' : 'Créer'}</button>
      </form>
    </div>
  );
}

export default VoyageForm;
