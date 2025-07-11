import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getVoyagesByTrajet } from '../../api/voyageApi';
import { getAllTrajets } from '../../api/trajetApi';
import { createReservation } from '../../api/reservationApi';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const VoyagesParTrajet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { trajetId: paramTrajetId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [trajets, setTrajets] = useState([]);
  const [selectedTrajetId, setSelectedTrajetId] = useState(paramTrajetId || '');
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrajets = async () => {
      try {
        const res = await getAllTrajets();
        setTrajets(res.data);
      } catch (err) {
        toast.error("Erreur chargement trajets ");
      }
    };
    fetchTrajets();
  }, []);

  useEffect(() => {
    if (!selectedTrajetId) return;

    const fetchVoyages = async () => {
      setLoading(true);
      try {
        const res = await getVoyagesByTrajet(selectedTrajetId);
        setVoyages(res.data);
      } catch (err) {
        toast.error("Erreur chargement voyages ");
      } finally {
        setLoading(false);
      }
    };

    fetchVoyages();
  }, [selectedTrajetId]);

  const handleTrajetChange = (e) => {
    const id = e.target.value;
    setSelectedTrajetId(id);
    setSearchParams({ trajet: id });
  };

  const handleReservation = async (voyageId) => {
    try {
      const res = await createReservation({
        voyage: voyageId,
        voyageur: user._id,
        nombre_places: 1,
      });
      navigate(`/register`);
    } catch (error) {
      toast.error("Erreur réservation ");
    }
  };

  return (
    <div className="voyages-trajet-container">
      <h2>Rechercher des Voyages par Trajet</h2>

      <div className="trajet-select">
        <label htmlFor="trajet">Choisir un trajet :</label>
        <select id="trajet" value={selectedTrajetId} onChange={handleTrajetChange}>
          <option value="">-- Sélectionnez un trajet --</option>
          {trajets.map((t) => (
            <option key={t._id} value={t._id}>
              {t.lieux_depart} → {t.lieux_arrive}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading"><Loader /></div>
      ) : voyages.length === 0 ? (
        <p>Aucun voyage trouvé pour ce trajet.</p>
      ) : (
        <div className="voyages-grid">
          {voyages.map((voyage) => (
            <div className="voyage-card" key={voyage._id}>
              <h3 className="title">
                {trajets.find(t => t._id === selectedTrajetId)?.lieux_depart} → {trajets.find(t => t._id === selectedTrajetId)?.lieux_arrive}
              </h3>

              <div className="infos">
                <strong>Date :</strong> {new Date(voyage.date_depart).toLocaleDateString()}<br />
                <strong>Heure départ :</strong> {voyage.heure_depart}<br />
                <strong>Heure arrivée estimée :</strong> {voyage.heure_arrivee_Estime}<br />
                <strong>Prix :</strong> {voyage.prix_par_place.toLocaleString()} FCFA
              </div>

              <div className={`statut statut-${voyage.statut?.toLowerCase().replace(/\s/g, '-')}`}>
                <strong>Statut :</strong> {voyage.statut}
              </div>

              <button
                onClick={() => handleReservation(voyage._id)}
                className="btn-reserver"
              >
                <FaCheck /> Réserver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoyagesParTrajet;
