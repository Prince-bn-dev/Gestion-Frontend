// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicules: 0,
    disponibles: 0,
    enMaintenance: 0,
    totalparcs: 0,
  });
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Données vitrines simulées
    const mockVehiculesStats = {
      total: 35,
      disponibles: 22,
      enMaintenance: 13,
    };

    const mockparcsStats = {
      total: 5,
    };

    const mockReservations = [
      {
        _id: '1',
        clientName: 'Jean Djoussouvi',
        vehiculeMarque: 'Toyota',
        vehiculeModel: 'Corolla',
        startDate: '2025-05-15',
        endDate: '2025-05-18',
        status: 'Confirmée',
      },
      {
        _id: '2',
        clientName: 'Marie Costa',
        vehiculeMarque: 'Peugeot',
        vehiculeModel: '208',
        startDate: '2025-05-20',
        endDate: '2025-05-22',
        status: 'En attente',
      },
      {
        _id: '3',
        clientName: 'Ali Abdoul',
        vehiculeMarque: 'Renault',
        vehiculeModel: 'Clio',
        startDate: '2025-05-10',
        endDate: '2025-05-14',
        status: 'Terminée',
      },
    ];
    setStats({
      totalVehicules: mockVehiculesStats.total,
      disponibles: mockVehiculesStats.disponibles,
      enMaintenance: mockVehiculesStats.enMaintenance,
      totalparcs: mockparcsStats.total,
    });

    setRecentReservations(mockReservations);
    setLoading(false);
  }, []);

  if (loading) return <p className="loading-message">Chargement du tableau de bord...</p>;

  return (
    <div className="dashboard-container">
      <h1>Tableau de bord - Gestion de parc automobile</h1>

      <p className="intro-text">
        Ce tableau de bord centralise les informations clés de votre flotte automobile. Il vous permet d’optimiser la gestion quotidienne, 
        d’anticiper les maintenances et de suivre les réservations récentes de véhicules.
      </p>

      <section className="stats-cards" aria-label="Statistiques clés du parc automobile">
        <div className="card total-vehicules">
          <h3>Total véhicules</h3>
          <p>{stats.totalVehicules}</p>
          <small>Nombre total de véhicules enregistrés dans votre parc.</small>
        </div>
        <div className="card disponibles">
          <h3>Disponibles</h3>
          <p>{stats.disponibles}</p>
          <small>Véhicules prêts à être utilisés immédiatement.</small>
        </div>
        <div className="card maintenance">
          <h3>En maintenance</h3>
          <p>{stats.enMaintenance}</p>
          <small>Véhicules actuellement en réparation ou contrôle technique.</small>
        </div>
        <div className="card total-parcs">
          <h3>Parcs</h3>
          <p>{stats.totalparcs}</p>
          <small>Nombre total de sites ou parcings gérés.</small>
        </div>
      </section>

      <section className="recent-reservations" aria-label="Réservations récentes">
        <h2>Réservations récentes</h2>
        <p className="section-description">
          Liste des dernières réservations effectuées, avec les informations sur le client, le véhicule et les dates de location.
          Ce suivi vous aide à anticiper la disponibilité et à planifier la maintenance.
        </p>

        {recentReservations.length === 0 ? (
          <p>Aucune réservation récente.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Véhicule</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.map((res) => (
                <tr key={res._id}>
                  <td>{res.clientName}</td>
                  <td>{res.vehiculeMarque} {res.vehiculeModel}</td>
                  <td>{new Date(res.startDate).toLocaleDateString()}</td>
                  <td>{new Date(res.endDate).toLocaleDateString()}</td>
                  <td>{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <p className="d-footer">
        Un bon suivi de votre parc automobile permet de réduire les coûts, d’améliorer la sécurité des conducteurs et d’optimiser la disponibilité des véhicules.
        Utilisez ce tableau de bord pour une gestion proactive et efficace.
      </p>
    </div>
  );
}

export default Dashboard;
