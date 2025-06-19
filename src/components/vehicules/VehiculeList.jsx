import React, { useEffect, useState } from 'react';
import { getVehiculeByGestionnaire, getVehiculeByChauffeur, deleteVehicule } from '../../api/vehiculeApi';
import { useAuth } from '../../context/AuthContext';
 
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';

function VehiculesList() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        if (user.role === "gestionnaire") {
          const response = await getVehiculeByGestionnaire(userId);
          setVehicules(response.data);
          console.log('Véhicules chargés avec succès');
        } else if (user.role === "chauffeur") {
          const response = await getVehiculeByChauffeur(userId);
          setVehicules(response.data);
          console.log('Véhicules chargés avec succès');
        }
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors du chargement des véhicules');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicules();
  }, [userId]);

  const handleDelete = async (vehiculeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await deleteVehicule(vehiculeId);
        setVehicules(vehicules.filter(v => v._id !== vehiculeId));
        console.log('Véhicule supprimé avec succès');
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors de la suppression du véhicule');
      }
    }
  };

  if (loading) return <p>Chargement des véhicules...</p>;
  if (vehicules.length === 0) return <p>Aucun véhicule trouvé.</p>;

  const isGestionnaire = user.role === "gestionnaire";

  return (
    <div
      className={`vehicules-list-container ${!isGestionnaire ? 'chauffeur-style' : ''}`}
    >
      <h2> {isGestionnaire ?"Liste des véhicules":" Les véhicules auxquels vous êtes assigné(e)"} </h2>
      <table className="vehicules-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '8px' }}>Marque</th>
            <th style={{ padding: '8px' }}>Modèle</th>
            <th style={{ padding: '8px' }}>Immatriculation</th>
            <th style={{ padding: '8px' }}>Parc</th>
            <th style={{ padding: '8px' }}>Propriétaire</th>
            <th style={{ padding: '8px' }}>Statut</th>
            {isGestionnaire && <th style={{ padding: '8px', textAlign: 'center' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {vehicules.map((vehicule) => (
            <tr key={vehicule._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{vehicule.marque}</td>
              <td style={{ padding: '8px' }}>{vehicule.modele}</td>
              <td style={{ padding: '8px' }}>{vehicule.immatriculation}</td>
              <td style={{ padding: '8px' }}>{vehicule.parc ? vehicule.parc.nom : 'Non attribué'}</td>
              <td style={{ padding: '8px' }}>
                {vehicule.gestionnaire?.nom || 'Inconnu'}<br />
                {vehicule.gestionnaire?.prenom}
              </td>
              <td style={{ padding: '8px' }}>{vehicule.statut === 'actif' ? 'Disponible' : 'Indisponible'}</td>
              {isGestionnaire && (
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <Link to={`/vehicules/${vehicule._id}`} title="Détails" style={{ marginRight: '10px', color: '#007bff' }}>
                    <FaInfoCircle size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicule._id)}
                    title="Supprimer"
                    style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', marginRight: '10px' }}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                  <Link to={`/vehicules/edit/${vehicule._id}`} title="Modifier" style={{ color: '#28a745' }}>
                    <FaEdit size={18} />
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehiculesList;
