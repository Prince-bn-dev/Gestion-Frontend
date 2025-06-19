import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getParcById } from '../../api/parcApi';
 

const ParcDetail = () => {
  const { id } = useParams();
  const [parc, setParc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadParc = async () => {
      try {
        const response = await getParcById(id);
        setParc(response.data);
        console.log('Parc chargé avec succès');
      } catch (err) {
        console.log(err.response?.data?.message || 'Erreur lors du chargement du parc');
      } finally {
        setLoading(false);
      }
    };
    loadParc();
  }, [id]);

  if (loading) return <div className="parc-detail__loading">Chargement...</div>;
  if (!parc) return <div className="parc-detail__not-found">Parc non trouvé</div>;

  return (
    <div className="parc-detail">
      <div className="parc-card">
        <h2>{parc.nom}</h2>
        <p><strong>Localisation :</strong> {parc.localisation || 'Non spécifiée'}</p>
        <p><strong>Description :</strong> {parc.description || 'Non fournie'}</p>
        <p>
          <strong>Horaires :</strong> {parc.heures_ouverture} - {parc.heures_fermeture}
        </p>

        <div className="buttons">
          <Link className="btn edit" to={`/parcs/edit/${parc._id}`}>Modifier</Link>
          <Link className="btn back" to="/parcs">Retour</Link>
        </div>
      </div>
    </div>
  );
};

export default ParcDetail;
