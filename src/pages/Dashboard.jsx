import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line  } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicules: 0,
    disponibles: 0,
    enMaintenance: 0,
    totalparcs: 0,
  });
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieData = [
    { name: 'Disponibles', value: stats.disponibles },
    { name: 'En maintenance', value: stats.enMaintenance },
    { name: 'Indisponibles', value: stats.totalVehicules - stats.disponibles - stats.enMaintenance },
  ];
  
const voyageStats = [
  { mois: 'Jan', voyages: 20 },
  { mois: 'Fév', voyages: 35 },
  { mois: 'Mars', voyages: 50 },
  { mois: 'Avr', voyages: 45 },
  { mois: 'Mai', voyages: 30 },
];

const reservationStats = [
  { jour: 'Lun', reservations: 12 },
  { jour: 'Mar', reservations: 18 },
  { jour: 'Mer', reservations: 25 },
  { jour: 'Jeu', reservations: 15 },
  { jour: 'Ven', reservations: 20 },
];

  useEffect(() => {
    const mockVehiculesStats = {
      total: 35,
      disponibles: 22,
      enMaintenance: 8,
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
        Ce tableau de bord centralise les informations clés de votre flotte automobile.
      </p>

      <section className="stats-cards" aria-label="Statistiques clés du parc automobile">
        <div className="card total-vehicules">
          <h3>Total véhicules</h3>
          <p>{stats.totalVehicules}</p>
        </div>
        <div className="card disponibles">
          <h3>Disponibles</h3>
          <p>{stats.disponibles}</p>
        </div>
        <div className="card maintenance">
          <h3>En maintenance</h3>
          <p>{stats.enMaintenance}</p>
        </div>
        <div className="card total-parcs">
          <h3>Parcs</h3>
          <p>{stats.totalparcs}</p>
        </div>
      </section>

      <section className="chart-section">
        <h2>Répartition des véhicules</h2>
<div className="donut-chart-container">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={90}
        paddingAngle={5}
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

  <div className="legend-custom">
    {pieData.map((entry, index) => (
      <div key={index} className="legend-item">
        <span
          className="legend-color"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></span>
        <span>{entry.name} ({entry.value})</span>
      </div>
    ))}
  </div>
</div>

          <h2>Voyages par mois</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={voyageStats}>
      <XAxis dataKey="mois" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="voyages" fill="#1f32e9" />
    </BarChart>
  </ResponsiveContainer>

  <h2 style={{ marginTop: '2rem' }}>Réservations par jour</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={reservationStats}>
      <XAxis dataKey="jour" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="reservations" stroke="#f45e03" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
      </section>

      <section className="recent-reservations">
        <h2>Réservations récentes</h2>
        {recentReservations.length === 0 ? (
          <p>Aucune réservation récente.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Véhicule</th>
                <th>Date début</th>
                <th>Date fin</th>
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
    </div>
  );
}

export default Dashboard;
