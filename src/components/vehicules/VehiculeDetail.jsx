import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVehiculeById, deleteVehicule } from '../../api/vehiculeApi';
import { toast } from 'react-toastify';
import {
  FaCar, FaRoad, FaCalendarAlt, FaMapMarkerAlt, FaUser
} from 'react-icons/fa';
import AddChauffeurToVehicule from './AddChauffeurToVehicule';

function VehiculeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicule, setVehicule] = useState(null);

  useEffect(() => {
    getVehiculeById(id)
      .then(res => setVehicule(res.data))
      .catch(err => {
        toast.error(err.response?.data?.message || 'Véhicule introuvable');
        navigate('/vehicules');
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce véhicule ?')) {
      try {
        await deleteVehicule(id);
        toast.success('Véhicule supprimé avec succès');
        navigate('/vehicules');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const getStatusClass = (statut) => {
    switch (statut) {
      case 'Disponible':
        return 'disponible';
      case 'En service':
        return 'en-service';
      case 'Maintenance':
        return 'maintenance';
      default:
        return '';
    }
  };

  if (!vehicule) return <p>Chargement...</p>;

  return (
    <div className="vehicule-detail-container">
      <div className="header">
        <h2>{vehicule.immatriculation}</h2>
        <span className={`status-badge ${getStatusClass(vehicule.statut)}`}>
          {vehicule.statut}
        </span>
      </div>

      <p className="sub">{vehicule.marque} {vehicule.modele}</p>

      <div className="vehicule-info">
        <p><FaCar /> {vehicule.type}</p>
        <p><FaRoad /> {vehicule.kilometrage.toLocaleString()} km</p>
        <p><FaMapMarkerAlt className="gps" /> GPS {vehicule.gpsActif ? 'activé' : 'désactivé'}</p>
      </div>

      <div className="additional-info">
        <p><FaUser /> <strong>Chauffeur :</strong> {vehicule.chauffeur?.nom || 'Aucun'}</p>
        <p><strong>Parc :</strong> {vehicule.parc?.nom || 'Aucun'}</p>
        <p><strong>Capacité :</strong> {vehicule.capacite} places</p>
        <p><strong>Climatisation :</strong> {vehicule.climatisation ? 'Oui' : 'Non'}</p>
        <p><strong>Chargeur :</strong> {vehicule.chargeur ? 'Oui' : 'Non'}</p>
      </div>

      <div className="buttons">
        <Link to={`/vehicules/edit/${vehicule._id}`} className="btn">Modifier</Link>
        <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
        <Link to="/vehicules" className="btn">Retour</Link>
      </div>
      {vehicule?.chauffeur ?"":<AddChauffeurToVehicule vehiculeId={id} />}
    </div>
  );
}

export default VehiculeDetail;
