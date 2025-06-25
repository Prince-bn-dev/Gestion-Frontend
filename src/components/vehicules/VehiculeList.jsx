import React, { useEffect, useState } from 'react';
import { getVehiculeByGestionnaire, getVehiculeByChauffeur, deleteVehicule } from '../../api/vehiculeApi';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Loader from '../Loader';


function VehiculesList() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const response = user.role === 'gestionnaire'
          ? await getVehiculeByGestionnaire(userId)
          : await getVehiculeByChauffeur(userId);

        setVehicules(response.data);
        console.log('Véhicules chargés avec succès');
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors du chargement des véhicules');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicules();
  }, [user.role, userId]);

  const handleDelete = async (vehiculeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await deleteVehicule(vehiculeId);
        setVehicules((prev) => prev.filter(v => v._id !== vehiculeId));
        console.log('Véhicule supprimé avec succès');
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors de la suppression du véhicule');
      }
    }
  };

  if (loading) return <Loader />;
  if (vehicules.length === 0) return <p>Aucun véhicule trouvé.</p>;

  const isGestionnaire = user.role === 'gestionnaire';

  return (
    <div className={`vehicules-list-container ${!isGestionnaire ? 'chauffeur-style' : ''}`}>
      <h2>{isGestionnaire ? 'Liste des véhicules' : 'Les véhicules auxquels vous êtes assigné(e)'}</h2>
      <div className="table-wrapper">
        <table className="vehicules-table">
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Immatriculation</th>
              <th>Parc</th>
              <th>Propriétaire</th>
              <th>Statut</th>
              {isGestionnaire && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {vehicules.map((vehicule) => (
              <tr key={vehicule._id}>
                <td>{vehicule.marque}</td>
                <td>{vehicule.modele}</td>
                <td>{vehicule.immatriculation}</td>
                <td>{vehicule.parc?.nom || 'Non attribué'}</td>
                <td>
                  {vehicule.gestionnaire?.nom || 'Inconnu'}<br />
                  {vehicule.gestionnaire?.prenom}
                </td>
                <td>{vehicule.statut === 'actif' ? 'Disponible' : 'Indisponible'}</td>
                {isGestionnaire && (
                  <td className="actions">
                    <Link to={`/vehicules/${vehicule._id}`} title="Détails">
                      <FaInfoCircle />
                    </Link>
                    <button onClick={() => handleDelete(vehicule._id)} title="Supprimer">
                      <FaTrashAlt />
                    </button>
                    <Link to={`/vehicules/edit/${vehicule._id}`} title="Modifier">
                      <FaEdit />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehiculesList;
