import React, { useEffect, useState } from 'react';
import { getAllVoyages } from '../../api/voyageApi';
import { toast } from 'react-toastify';

const VoyagesTable = () => {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoyages = async () => {
      try {
        const res = await getAllVoyages();
        setVoyages(res.data);
        toast.success('Voyages chargés avec succès');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Erreur lors du chargement des voyages');
      } finally {
        setLoading(false);
      }
    };

    fetchVoyages();
  }, []);

  if (loading) return <div className="voyages-table">Chargement...</div>;
  return (
    <div className="voyages-table">
      <h2>Liste des Voyages</h2>
      <table>
        <thead>
          <tr>
            <th>Voyageur</th>
            <th>Email</th>
            <th>Destination</th>
            <th>Date départ</th>
            <th>Véhicule</th>
            <th>Matricule</th>
            <th>Prix Total</th>
            <th>Places dispo</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {voyages.map((v) => (
            <tr key={v._id}>
              <td>{v.userId?.nom}</td>
              <td>{v.userId?.email}</td>
              <td>{v.destination}</td>
              <td>{new Date(v.heureDepart).toLocaleString()}</td>
              <td>{v.vehiculeId?.marque} {v.vehiculeId?.model}</td>
              <td>{v.vehiculeId?.numeroMatricule}</td>
              <td>{v.prixTotal} FCFA</td>
              <td>{v.placeDisponible}</td>
              <td className={`status ${v.status.replace(' ', '-')}`}>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoyagesTable;
