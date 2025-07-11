import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrajets } from '../../api/trajetApi';
import { getVoyagesByTrajet } from '../../api/voyageApi';
import Loader from "../../components/Loader";

function Trajet() {
  const [trajets, setTrajets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const res = await getAllTrajets();
        const trajetsWithVoyageCount = await Promise.all(
          res.data.map(async (trajet) => {
            try {
              const voyagesRes = await getVoyagesByTrajet(trajet._id);
              return { ...trajet, nombreVoyages: voyagesRes.data.length };
            } catch (error) {
              console.log("Erreur récupération voyages pour trajet :");
              return { ...trajet, nombreVoyages: 0 };
            }
          })
        );
        setTrajets(trajetsWithVoyageCount);
      } catch (error) {
        console.log('Erreur lors de la récupération des trajets ');
      } finally {
        setLoading(false);
      }
    };

    fetchTrajets();
  }, []);

  const handleVoirVoyages = (trajetId) => {
    navigate(`/trajets/${trajetId}/voyages`);
  };

  return (
    <div className="trajet-container">
      <h1 className="trajet-title">Liste des Trajets</h1>

      {loading ? (
        <p className="loading"><Loader /></p>
      ) : (
        <div className="trajet-list">
          {trajets.map((trajet) => (
            <div className="trajet-card" key={trajet._id}>
              <h2>{trajet.lieux_depart} → {trajet.lieux_arrive}</h2>
              <p><strong>Distance :</strong> {trajet.distance} km</p>
              <p><strong>Durée :</strong> {trajet.duree}</p>
              <p><strong>Nombre de voyages :</strong> {trajet.nombreVoyages}</p>

              <button
                className="voir-button"
                onClick={() => handleVoirVoyages(trajet._id)}
              >
                Voir les voyages
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trajet;
