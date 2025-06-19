import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParcsByGestionnaire } from '../../api/parcApi';
import { useAuth } from '../../context/AuthContext';
 

const ParcList = () => {
  const [parcs, setParcs] = useState([]);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (userId) loadParcs();
  }, [userId]);

  const loadParcs = async () => {
    try {
      const response = await getParcsByGestionnaire(userId);
      const data = response.data;
      setParcs(data);
      console.log('Parcs chargés avec succès');
      if (data.length === 0) {
        toast.info('Aucun parc trouvé pour cet utilisateur.');
      }
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur lors du chargement des parcs');
    }
  };

  return (
    <div className="parc-list-container">
      <div className="header">
        <h2>Liste des parcs</h2>
        <Link to="/parcs/create">
          <button className="btn primary">Créer un nouveau parc</button>
        </Link>
      </div>

      {parcs.length === 0 ? (
        <p>Aucun parc trouvé.</p>
      ) : (
        <ul className="parc-list">
          {parcs.map((parc) => (
            <li key={parc._id} className="parc-item">
              <div className="info">
                <h3>{parc.nom}</h3>
                <p>{parc.localisation}</p>
                <p>{parc.description}</p>
                <p>
                  <strong>Ouverture :</strong> {parc.heures_ouverture} - {parc.heures_fermeture}
                </p>
              </div>
              <div className="actions">
                <Link to={`/parcs/${parc._id}`}>
                  <button className="btn details">Détails</button>
                </Link>
                <Link to={`/parcs/edit/${parc._id}`}>
                  <button className="btn edit">Modifier</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParcList;
