import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVoyagesByGestionnaire, deleteVoyage } from '../../api/voyageApi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function MyVoyages() {
  const { user } = useAuth();
  const [voyages, setVoyages] = useState([]);
  const navigate = useNavigate();

  const fetchVoyages = async () => {
    if (user) {
      try {
        const res = await getVoyagesByGestionnaire(user._id);
        setVoyages(res.data);
        if (res.data.length === 0) {
          toast.info('Aucun voyage trouvé pour cet utilisateur.');
        }
      } catch (error) {
        toast.error('Erreur lors du chargement des voyages : ' + (error.response?.data?.message || error.message));
      }
    }
  };

  useEffect(() => {
    fetchVoyages();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce voyage ?')) {
      try {
        await deleteVoyage(id);
        fetchVoyages(); 
        toast.success('Voyage supprimé avec succès');
      } catch (err) {
        toast.error('Erreur lors de la suppression du voyage : ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/voyages/edit/${id}`);
  };

  return (
    <div className="my-voyages-container">
      <h2>Planification des Voyages</h2>
      {voyages.length === 0 ? (
        <p>Aucun voyage trouvé.</p>
      ) : (
        <ul>
          {voyages.map(v => (
            <li key={v._id}>
              <strong>{v.destination}</strong> 
              <br />
              <span>Départ : {(v.heure_depart)}</span>
               <br />
              <span>Arrivée : {(v.heure_arrivee_Estime)}</span>
               <br />
               <span>Prix: {v.prix_par_place} </span>
               <br />
              <span>Véhicule: {v.vehicule?.marque || 'N/A'}</span>
              <br />
              <span>Chauffeur: {v.vehicule?.chauffeur?.nom || 'Aucun'}</span>
              <br />
              <span>Status: {v.statut}</span>
              <br />
              <button onClick={() => handleEdit(v._id)}>Modifier</button>
              <button onClick={() => handleDelete(v._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyVoyages;
