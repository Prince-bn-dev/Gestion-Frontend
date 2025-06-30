import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getVoyagesByGestionnaire,
  getVoyagesByChauffeurVehicule,
  deleteVoyage,
} from '../../api/voyageApi';
import { useAuth } from '../../context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import Modal from '../../uikits/Modal';
import VoyageForm from './VoyageForm';

function MyVoyages() {
  const { user } = useAuth();
  const [voyages, setVoyages] = useState([]);
  const [editingVoyageId, setEditingVoyageId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const fetchVoyages = async () => {
    if (!user) return;
    try {
      const res = user.role === 'gestionnaire'
        ? await getVoyagesByGestionnaire(user._id)
        : await getVoyagesByChauffeurVehicule(user._id);

      setVoyages(res.data);
    } catch (error) {
      console.log('Erreur lors du chargement des voyages :', error.response?.data?.message || error.message);
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
        console.log('Voyage supprimé avec succès');
      } catch (err) {
        console.log('Erreur lors de la suppression du voyage :', err.response?.data?.message || err.message);
      }
    }
  };


  const handleEdit = (id) => {
    setEditingVoyageId(id);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setEditingVoyageId(null);
    setShowEditModal(false);
    setShowCreateModal(false);
    fetchVoyages();
  };


  const openCreateModal = () => setShowCreateModal(true);


  const filteredVoyages = voyages.filter((v) =>
    v.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vehicule?.marque?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.vehicule?.immatriculation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lineChartData = [
    { date: '2025-06-10', passagers: 12 },
    { date: '2025-06-11', passagers: 8 },
    { date: '2025-06-12', passagers: 15 },
    { date: '2025-06-13', passagers: 5 },
    { date: '2025-06-14', passagers: 9 },
  ];

  const pieChartData = [
    { name: 'Confirmée', value: 10 },
    { name: 'En attente', value: 4 },
    { name: 'Terminée', value: 6 },
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  return (
    <div className="mes-voyages-container" style={{ padding: '1rem 2rem' }}>
      <h2>Mes Voyages</h2>

      {/* Barre d’actions : recherche + bouton création */}
      <div
        className="actions-bar"
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un voyage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1,
            minWidth: 200,
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
          aria-label="Rechercher un voyage"
        />
        {user?.role === 'gestionnaire' && (
          <button
            onClick={openCreateModal}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '0.6rem 1.2rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
            }}
            aria-label="Ajouter un voyage"
          >
            + Ajouter un voyage
          </button>
        )}
      </div>

      {/* Liste des voyages filtrée */}
      {filteredVoyages.length === 0 ? (
        <p className="no-voyage" style={{ fontStyle: 'italic', color: '#666' }}>
          Aucun voyage trouvé.
        </p>
      ) : (
        <ul className="voyage-list" style={{ listStyle: 'none', padding: 0 }}>
          {filteredVoyages.map((v) => (
            <li
              className="voyage-item"
              key={v._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <p><strong>{v.destination}</strong></p>
              <p><span>Départ</span> : {v.heure_depart}</p>
              <p><span>Arrivée estimée</span> : {v.heure_arrivee_Estime}</p>
              <p><span>Prix</span> : {v.prix_par_place} FCFA</p>
              <p><span>Véhicule</span> : {v.vehicule?.marque || 'N/A'} ({v.vehicule?.immatriculation || '---'})</p>
              <p><span>Chauffeur</span> : {v.vehicule?.chauffeur?.nom || 'Aucun'} {v.vehicule?.chauffeur?.prenom || ''}</p>
              <p className={`statut ${v.statut}`}><span>Statut</span> : {v.statut}</p>
              {user.role === 'gestionnaire' && (
                <div className="actions" style={{ marginTop: '0.5rem' }}>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(v._id)}
                    style={{
                      marginRight: '0.5rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: 4,
                      border: 'none',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    aria-label={`Modifier le voyage vers ${v.destination}`}
                  >
                    Modifier
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(v._id)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: 4,
                      border: 'none',
                      backgroundColor: '#f44336',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                    aria-label={`Supprimer le voyage vers ${v.destination}`}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modal édition */}
      {showEditModal && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Modifier le voyage">
          <VoyageForm id={editingVoyageId} onClose={handleCloseModal} />
        </Modal>
      )}

      {/* Modal création */}
      {showCreateModal && (
        <Modal isOpen={true} onClose={handleCloseModal} title="Ajouter un voyage">
          <VoyageForm onClose={handleCloseModal} />
        </Modal>
      )}

      {/* Graphiques */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '40px' }}>
        <div style={{ flex: 1, minWidth: 300, height: 300 }}>
          <h4>Passagers par Jour</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="passagers" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, minWidth: 300, height: 300 }}>
          <h4>Répartition des Statuts</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MyVoyages;
