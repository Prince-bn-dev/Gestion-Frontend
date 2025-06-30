import React, { useEffect, useState } from 'react';
import { getParcsByGestionnaire } from '../../api/parcApi';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../uikits/Modal';
import ParcForm from './ParcForm';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ParcList = () => {
  const [parcs, setParcs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const userId = user?._id;
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingParcId, setEditingParcId] = useState(null);

  useEffect(() => {
    if (userId) loadParcs();
  }, [userId]);

  const loadParcs = async () => {
    try {
      const response = await getParcsByGestionnaire(userId);
      setParcs(response.data);
      console.log('Parcs chargés avec succès');
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur lors du chargement des parcs');
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingParcId(null);
    loadParcs();
  };

  // 🔍 Filtrage des parcs par nom
  const filteredParcs = parcs.filter((parc) =>
    parc.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="parc-list-container">
      <div className="header">
        <h2>Liste des parcs</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={() => setShowCreateModal(true)}>
            + Ajouter un parc
          </button>
        </div>
      </div>

      {showCreateModal && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Nouveau parc">
          <ParcForm onClose={handleCloseModal} />
        </Modal>
      )}

      {editingParcId && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Modification du parc">
          <ParcForm id={editingParcId} onClose={handleCloseModal} />
        </Modal>
      )}

      {filteredParcs.length === 0 ? (
        <p>Aucun parc trouvé.</p>
      ) : (
        <table className="parc-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Localisation</th>
              <th>Description</th>
              <th>Horaires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcs.map((parc) => (
              <tr key={parc._id}>
                <td>{parc.nom}</td>
                <td>{parc.localisation}</td>
                <td>{parc.description}</td>
                <td>{parc.heures_ouverture} - {parc.heures_fermeture}</td>
                <td className="actions">
                  <FaEye
                    className="icon view-icon"
                    onClick={() => navigate(`/parcs/${parc._id}`)}
                    title="Voir les détails"
                  />
                  <FaEdit
                    className="icon edit-icon"
                    onClick={() => setEditingParcId(parc._id)}
                    title="Modifier"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParcList;
