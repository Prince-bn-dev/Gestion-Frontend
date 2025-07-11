import React, { useEffect, useState } from 'react';
import {
  getVehiculeByGestionnaire,
  getVehiculeByChauffeur,
  deleteVehicule,
} from '../../api/vehiculeApi';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Loader from '../Loader';
import { BackgroundButton } from '../../uikits/Button';
import VehiculeForm from './VehiculeForm';
import Modal from '../../uikits/Modal';
import { toast } from 'react-toastify';

function VehiculesList() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVehiculeId, setEditingVehiculeId] = useState(null);

  const { user } = useAuth();
  const userId = user?._id;

  const loadVehicules = async () => {
    try {
      const response =
        user.role === 'gestionnaire'
          ? await getVehiculeByGestionnaire(userId)
          : await getVehiculeByChauffeur(userId);
      setVehicules(response.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadVehicules();
  }, [user.role, userId]);

  const handleDelete = async (vehiculeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await deleteVehicule(vehiculeId);
        setVehicules((prev) => prev.filter((v) => v._id !== vehiculeId));
        toast.success('Véhicule supprimé avec succès');
      } catch (err) {
        toast.error('Erreur lors de la suppression du véhicule');
      }
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingVehiculeId(null);
    loadVehicules();
  };

  const isGestionnaire = user.role === 'gestionnaire';

  const filteredVehicules = vehicules.filter((v) =>
    `${v.marque} ${v.modele} ${v.immatriculation}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className={`vehicules-list-container ${!isGestionnaire ? 'chauffeur-style' : ''}`}>
      <div className='header'>
        <h2>
          {isGestionnaire
            ? 'Liste des véhicules'
            : 'Les véhicules auxquels vous êtes assigné(e)'}
        </h2>
        {isGestionnaire && (
          <div className='header-actions'>
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BackgroundButton
              text="Ajouter un véhicule"
              onClick={() => setShowCreateModal(true)}
            />
          </div>
        )}
      </div>

      {showCreateModal && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Ajouter un véhicule">
          <VehiculeForm onClose={handleCloseModal} />
        </Modal>
      )}

      {editingVehiculeId && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Modifier le véhicule">
          <VehiculeForm id={editingVehiculeId} onClose={handleCloseModal} />
        </Modal>
      )}

      {filteredVehicules.length === 0 ? (
        <p>Aucun véhicule trouvé.</p>
      ) : (
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
              {filteredVehicules.map((vehicule) => (
                <tr key={vehicule._id}>
                  <td>{vehicule.marque}</td>
                  <td>{vehicule.modele}</td>
                  <td>{vehicule.immatriculation}</td>
                  <td>{vehicule.parc?.nom || 'Non attribué'}</td>
                  <td>
                    {vehicule.gestionnaire?.nom || 'Inconnu'} <br />
                    {vehicule.gestionnaire?.prenom}
                  </td>
                  <td>
                    {vehicule.statut === 'actif'
                      ? 'Disponible'
                      : vehicule.statut === 'maintenance'
                      ? 'En maintenance'
                      : 'Indisponible'}
                  </td>
                  {isGestionnaire && (
                    <td className="actions">
                      <Link to={`/vehicules/${vehicule._id}`} title="Détails">
                        <FaInfoCircle />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicule._id)}
                        title="Supprimer"
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        onClick={() => setEditingVehiculeId(vehicule._id)}
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VehiculesList;
