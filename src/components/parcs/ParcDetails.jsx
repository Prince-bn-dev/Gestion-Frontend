import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getParcById } from '../../api/parcApi';
import Loader from '../Loader';
import Modal from '../../uikits/Modal';
import ParcForm from './ParcForm';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

const ParcDetail = () => {
  const { id } = useParams();
  const [parc, setParc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const loadParc = async () => {
    try {
      const response = await getParcById(id);
      setParc(response.data);
      console.log('Parc chargé avec succès');
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur lors du chargement du parc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParc();
  }, [id]);

  const handleCloseEditModal = () => {
    setIsEditing(false);
    loadParc(); // Recharger les données après modification
  };

  if (loading) return <div className="parc-detail__loading"><Loader /></div>;
  if (!parc) return <div className="parc-detail__not-found">Parc non trouvé</div>;

  return (
    <div className="parc-detail">
      <div className="parc-card">
        <div className="parc-header">
          <h2>{parc.nom}</h2>
          <div className="icon-buttons">
            <FaEdit className="icon edit-icon" title="Modifier" onClick={() => setIsEditing(true)} />
            <Link to="/parcs">
              <FaArrowLeft className="icon back-icon" title="Retour" />
            </Link>
          </div>
        </div>

        <div className="parc-info">
          <p><strong>📍 Localisation :</strong> {parc.localisation || 'Non spécifiée'}</p>
          <p><strong>📝 Description :</strong> {parc.description || 'Non fournie'}</p>
          <p>
            <strong>⏰ Horaires :</strong> {parc.heures_ouverture || 'N.C'} - {parc.heures_fermeture || 'N.C'}
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
