import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrajetForm from './TrajetForm';
import Modal from '../../uikits/Modal';
import { BackgroundButton } from '../../uikits/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TrajetList = () => {
  const [trajets, setTrajets] = useState([]);
  const [editingTrajet, setEditingTrajet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const fetchTrajets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/trajets`);
      setTrajets(res.data);
      toast.success("Chargement réussie")
    } catch (err) {
      toast.error("Erreur lors du chargement ");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce trajet ?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}api/trajets/${id}`);
        fetchTrajets();
        toast.success("Chargement réussie")
      } catch (err) {
        toast.error("Erreur de suppression ");
      }
    }
  };

  const handleEdit = (trajet) => {
    setEditingTrajet(trajet);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingTrajet(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingTrajet(null);
    setShowModal(false);
    fetchTrajets();
  };

  useEffect(() => {
    fetchTrajets();
  }, []);

  const filteredTrajets = trajets.filter((t) =>
    t.lieux_depart.toLowerCase().includes(search.toLowerCase()) ||
    t.lieux_arrive.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="trajet-container">
      <h2>Liste des trajets</h2>

      <div className="trajet-actions">
        <input
          type="search"
          placeholder="Rechercher un trajet"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <BackgroundButton text="Ajouter un trajet" onClick={handleAdd} />
      </div>

      <table className="trajet-table">
        <thead>
          <tr>
            <th>Départ</th>
            <th>Arrivée</th>
            <th>Distance (km)</th>
            <th>Durée </th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrajets.map((trajet) => (
            <tr key={trajet._id}>
              <td>{trajet.lieux_depart}</td>
              <td>{trajet.lieux_arrive}</td>
              <td>{trajet.distance}</td>
              <td>{trajet.duree}</td>
              <td className="actions-col">
                <button className="icon-button edit" onClick={() => handleEdit(trajet)}>
                  <FaEdit />
                </button>
                <button className="icon-button delete" onClick={() => handleDelete(trajet._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={editingTrajet ? 'Modifier Trajet' : 'Nouveau Trajet'}
        >
          <TrajetForm onSuccess={handleCloseModal} editingTrajet={editingTrajet} />
        </Modal>
      )}
    </div>
  );
};

export default TrajetList;
