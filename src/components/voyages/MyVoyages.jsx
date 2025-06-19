import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVoyagesByGestionnaire, getVoyagesByChauffeurVehicule, deleteVoyage } from '../../api/voyageApi';
import { useAuth } from '../../context/AuthContext';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

function MyVoyages() {
  const { user } = useAuth();
  const [voyages, setVoyages] = useState([]);
  const navigate = useNavigate();

  const fetchVoyages = async () => {
    if (user) {
      try {
        let res;
        if (user.role === 'gestionnaire') {
          res = await getVoyagesByGestionnaire(user._id);
        } else if (user.role === 'chauffeur') {
          res = await getVoyagesByChauffeurVehicule(user._id);
        }

        setVoyages(res.data);

        if (res.data.length === 0) {
          console.log('Aucun voyage trouvé pour cet utilisateur.');
        }
      } catch (error) {
        console.log('Erreur lors du chargement des voyages : ' + (error.response?.data?.message || error.message));
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
        console.log('Voyage supprimé avec succès');
      } catch (err) {
        console.log('Erreur lors de la suppression du voyage : ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/voyages/edit/${id}`);
  };
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
    <div className="my-voyages-container" style={{ padding: '20px' }}>
      <h2>📅 Mes Voyages</h2>
      {voyages.length === 0 ? (
        <p>Aucun voyage trouvé.</p>
      ) : (
        <ul>
          {voyages.map((v) => (
            <li key={v._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <strong>{v.destination}</strong>
              <br />
              <span>Départ : {v.heure_depart}</span>
              <br />
              <span>Arrivée estimée : {v.heure_arrivee_Estime}</span>
              <br />
              <span>Prix : {v.prix_par_place} FCFA</span>
              <br />
              <span>Véhicule : {v.vehicule?.marque || 'N/A'} ({v.vehicule?.immatriculation || '---'})</span>
              <br />
              <span>Chauffeur : {v.vehicule?.chauffeur?.nom || 'Aucun'} {v.vehicule?.chauffeur?.prenom || ''}</span>
              <br />
              <span>Statut : {v.statut}</span>
              <br />
              {user.role === 'gestionnaire' && (
                <>
                  <button onClick={() => handleEdit(v._id)}>Modifier</button>{' '}
                  <button onClick={() => handleDelete(v._id)} style={{ color: 'red' }}>
                    Supprimer
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
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
