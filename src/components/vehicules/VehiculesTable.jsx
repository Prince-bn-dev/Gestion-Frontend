import React, { useEffect, useState } from 'react';
import { getVehicules } from '../../api/vehiculeApi';
import Loader from '../Loader';
 

const VehiculesTable = () => {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const response = await getVehicules();
        setVehicules(response.data);
        console.log('Véhicules chargés avec succès');
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors du chargement des véhicules');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicules();
  }, []);

  if (loading) return <div className="vehicules-table"><Loader /></div>;

  return (
    <div className="vehicules-table">
      <h2>Liste des Véhicules</h2>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Matricule</th>
            <th>Propriétaire</th>
            <th>Email</th>
            <th>parcing</th>
            <th>Emplacement</th>
          </tr>
        </thead>
        <tbody>
          {vehicules.map((v) => (
            <tr key={v._id}>
              <td>{v.marque}</td>
              <td>{v.model}</td>
              <td>{v.numeroMatricule}</td>
              <td>{v.userId?.nom} {v.userId?.prenom}</td>
              <td>{v.userId?.email}</td>
              <td>{v.parcId?.name}</td>
              <td>{v.parcId?.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiculesTable;
