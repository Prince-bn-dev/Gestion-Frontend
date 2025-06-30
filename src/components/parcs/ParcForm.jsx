import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParc, getParcById, updateParc } from '../../api/parcApi';
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader';

const ParcForm = ({ id, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [nom, setNom] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [description, setDescription] = useState('');
  const [heuresOuverture, setHeuresOuverture] = useState('');
  const [heuresFermeture, setHeuresFermeture] = useState('');
  const [parc, setParc] = useState(null);
  const [loading, setLoading] = useState(true);

  const gestionnaireId = user?._id;

  // Chargement du parc si ID est fourni
  useEffect(() => {
    if (id) {
      getParcById(id)
        .then((data) => {
          setParc(data);
          const p = data.data;
          setNom(p.nom);
          setLocalisation(p.localisation);
          setDescription(p.description);
          setHeuresOuverture(p.heures_ouverture);
          setHeuresFermeture(p.heures_fermeture);
        })
        .catch(() => alert('Parc introuvable'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  // Affichage du loader
  if (loading) return <div><Loader /></div>;

  // Message d'erreur si ID fourni mais parc introuvable
  if (id && !parc) return <div>Parc non trouvé</div>;

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nom,
      localisation,
      description,
      heures_ouverture: heuresOuverture,
      heures_fermeture: heuresFermeture,
      gestionnaire: gestionnaireId,
    };

    if (heuresFermeture <= heuresOuverture) {
      return console.log("L'heure de fermeture doit être après l'heure d'ouverture");
    }

    try {
      if (parc) {
        await updateParc(parc.data._id, data);
        console.log('Parc mis à jour avec succès');
      } else {
        await createParc(data);
        console.log('Parc créé avec succès');
      }
      onClose(); // ferme la modale
      navigate('/parcs'); // redirige vers la liste
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  return (
    <form className="parc-form" onSubmit={handleSubmit}>
      <h2>{parc ? 'Modifier le parc' : 'Créer un nouveau parc'}</h2>

      <div className="form-group">
        <label>Nom :</label>
        <input value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Localisation :</label>
        <input value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Description :</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Heures d’ouverture :</label>
        <input
          type="time"
          min="00:00"
          max="23:59"
          value={heuresOuverture}
          onChange={(e) => setHeuresOuverture(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Heures de fermeture :</label>
        <input
          type="time"
          min="00:00"
          max="23:59"
          value={heuresFermeture}
          onChange={(e) => setHeuresFermeture(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {parc ? 'Modifier' : 'Créer'}
      </button>
    </form>
  );
};

export default ParcForm;
