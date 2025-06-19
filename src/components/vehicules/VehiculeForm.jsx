import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createVehicule, updateVehicule, getVehiculeById } from '../../api/vehiculeApi';
import { getParcsByGestionnaire } from '../../api/parcApi';
import { useAuth } from '../../context/AuthContext';
 

function VehiculeForm() {
  const { user } = useAuth();
  const userId = user?._id;
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    marque: '',
    modele: '',
    immatriculation: '',
    type: 'voiture',
    capacite: '',
    kilometrage: '',
    climatisation: false,
    chargeur: false,
    gps: { type: 'non-gps' },
    parc: '',
    statut: 'actif',
  });

  const [parcs, setParcs] = useState([]);
  useEffect(() => {
    if (id) {
      getVehiculeById(id)
        .then(res => {
          const v = res.data;
          setForm({
            marque: v.marque || '',
            modele: v.modele || '',
            immatriculation: v.immatriculation || '',
            type: v.type || 'voiture',
            capacite: v.capacite || '',
            kilometrage: v.kilometrage || '',
            climatisation: v.climatisation || false,
            chargeur: v.chargeur || false,
            gps: v.gps || { type: 'non-gps' },
            parc: v.parc?._id || '',
            statut: v.statut || 'actif',
          });
        })
        .catch(err => {
          console.log(err.response?.data?.error || 'Erreur lors du chargement du véhicule');
          navigate('/vehicules');
        });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!userId) return;
    getParcsByGestionnaire(userId)
      .then(res => setParcs(res.data))
      .catch(err => {
        console.log(err.response?.data?.error || 'Erreur lors du chargement des parcs');
        setParcs([]);
      });
  }, [userId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('gps.')) {
      const gpsField = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        gps: {
          ...prev.gps,
          [gpsField]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!userId) {
      console.log('Vous devez être connecté pour soumettre un véhicule');
      return;
    }

    try {
      const dataToSend = {
        ...form,
        capacite: parseInt(form.capacite, 10),
        kilometrage: parseInt(form.kilometrage, 10),
        gestionnaire: userId,
      };

      if (id) {
        await updateVehicule(id, dataToSend);
        console.log('Véhicule modifié avec succès');
        navigate(`/vehicules/${id}`);
      } else {
        const response = await createVehicule(dataToSend);
        console.log('Véhicule créé avec succès');
        setForm({
          marque: '',
          modele: '',
          immatriculation: '',
          type: 'voiture',
          capacite: '',
          kilometrage: '',
          climatisation: false,
          chargeur: false,
          gps: { type: 'non-gps' },
          parc: '',
          statut: 'actif',
        });
        navigate(`/vehicules/${response.data._id}`);
      }
    } catch (err) {
      console.log(err.response?.data?.error || 'Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="create-vehicule-container">
      <h2>{id ? 'Modifier un véhicule' : 'Créer un véhicule'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} required />
        <input type="text" name="modele" placeholder="Modèle" value={form.modele} onChange={handleChange} required />
        <input type="text" name="immatriculation" placeholder="Immatriculation" value={form.immatriculation} onChange={handleChange} required />

        <label>Type
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="voiture">Voiture</option>
            <option value="camion">Camion</option>
            <option value="bus">Bus</option>
            <option value="moto">Moto</option>
          </select>
        </label>

        <input type="number" name="capacite" placeholder="Capacité" value={form.capacite} onChange={handleChange} required />
        <input type="number" name="kilometrage" placeholder="Kilométrage" value={form.kilometrage} onChange={handleChange} />

        <label>GPS
          <select name="gps.type" value={form.gps.type} onChange={handleChange}>
            <option value="non-gps">Non GPS</option>
            <option value="gps">GPS</option>
          </select>
        </label>

        <label>Parc
          <select name="parc" value={form.parc} onChange={handleChange} required>
            <option value="">Sélectionnez un parc</option>
            {parcs.length > 0 ? (
              parcs.map(parc => (
                <option key={parc._id} value={parc._id}>
                  {parc.nom} - {parc.localisation}
                </option>
              ))
            ) : (
              <option disabled>Aucun parc disponible</option>
            )}
          </select>
        </label>

        <div style={{ display: 'flex', gap: '10px' }}>
          
        <label>
          <input type="checkbox" name="climatisation" checked={form.climatisation} onChange={handleChange} />
          Climatisation
        </label>

        <label>
          <input type="checkbox" name="chargeur" checked={form.chargeur} onChange={handleChange} />
          Chargeur
        </label>
        </div>

        <label>Statut
          <select name="statut" value={form.statut} onChange={handleChange} required>
            <option value="actif">Actif</option>
            <option value="maintenance">Maintenance</option>
            <option value="hors_service">Hors service</option>
          </select>
        </label>

        <button type="submit">{id ? 'Mettre à jour' : 'Créer'}</button>
      </form>
    </div>
  );
}

export default VehiculeForm;
