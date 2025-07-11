import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getParcById } from '../../api/parcApi';
import Loader from '../Loader';
import Modal from '../../uikits/Modal';
import ParcForm from './ParcForm';
import {
  FaEdit,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaClock,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ParcDetail = () => {
  const { id } = useParams();
  const [parc, setParc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const loadParc = async () => {
    try {
      const response = await getParcById(id);
      setParc(response.data);
      toast.success('Parc chargé avec succès');
    } catch (err) {
      toast.error('Erreur lors du chargement du parc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParc();
  }, [id]);

  const handleCloseEditModal = () => {
    setIsEditing(false);
    loadParc();
  };

  if (loading) return <div className="parc-detail__loading"><Loader /></div>;
  if (!parc) return <div className="parc-detail__not-found">❌ Parc non trouvé</div>;

  return (
    <div className="parc-detail">
      <div className="parc-card">
        <div className="parc-header">
          <h2>{parc.nom}</h2>
          <div className="icon-buttons">
            <button className="icon-button" onClick={() => setIsEditing(true)} title="Modifier">
              <FaEdit />
            </button>
            <Link to="/parcs" className="icon-button" title="Retour à la liste">
              <FaArrowLeft />
            </Link>
          </div>
        </div>

        <div className="parc-info">
          <p>
            <FaMapMarkerAlt className="info-icon" /> 
            <strong>Localisation :</strong> {parc.localisation || 'Non spécifiée'}
          </p>
          <p>
            <FaInfoCircle className="info-icon" /> 
            <strong>Description :</strong> {parc.description || 'Non fournie'}
          </p>
          <p>
            <FaClock className="info-icon" /> 
            <strong>Horaires :</strong> {parc.heures_ouverture || 'N.C'} - {parc.heures_fermeture || 'N.C'}
          </p>
        </div>
      </div>

      {isEditing && (
        <Modal isOpen={true} onClose={handleCloseEditModal} title="Modifier le parc">
          <ParcForm id={parc._id} onClose={handleCloseEditModal} />
        </Modal>
      )}
    </div>
  );
};

export default ParcDetail;
