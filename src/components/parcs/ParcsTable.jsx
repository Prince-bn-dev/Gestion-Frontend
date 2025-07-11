import React, { useEffect, useState } from 'react';
import { getAllParcs } from '../../api/parcApi'; 
import Loader from '../Loader';
import { toast } from 'react-toastify';
 

const ParcsTable = () => {
  const [parcs, setparcs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadparcs = async () => {
      try {
        const data = await getAllParcs();
        setparcs(data);
        toast.success('parcs chargés avec succès \ Redirection dans quelques minutes');
      } catch (err) {
        toast.error('Erreur lors du chargement des parcs');
      } finally {
        setLoading(false);
      }
    };

    loadparcs();
  }, []);

  if (loading) return <div className="parcs-table"><Loader /></div>;

  return (
    <div className="parcs-table">
      <h2>Liste des parcings</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Emplacement</th>
            <th>Utilisateur</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {parcs.map((parc) => (
            <tr key={parc._id}>
              <td>{parc.name}</td>
              <td>{parc.location}</td>
              <td>{parc.userId?.nom || '—'}</td>
              <td>{parc.userId?.email || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcsTable;
