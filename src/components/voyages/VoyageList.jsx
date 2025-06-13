import React, { useEffect, useState } from 'react';
import { getAllVoyages } from '../../api/voyageApi';
import { createReservation } from '../../api/reservationApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaBus, FaCheck } from 'react-icons/fa';
import CommentaireForm from '../commentaires/CommentaireForm';
import CommentairesSection from '../commentaires/CommentairesSection';

function VoyagesList() {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const refreshCommentaires = () => setRefresh(!refresh);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllVoyages();
        setVoyages(res.data);
      } catch (err) {
        toast.error("Erreur lors du chargement des voyages");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleReservation = async (voyageId) => {
    try {
      const res = await createReservation({
        voyage: voyageId,
        voyageur: user._id,
        nombre_places: 1,
      });
      toast.success("Réservation créée. Veuillez procéder au paiement.");
      navigate(`/reservations/paiement/${res._id}`);
    } catch (error) {
      toast.error("Erreur lors de la création de la réservation");
      console.error(error);
    }
  };

  return (
    <div className="voyages-list-container">
      <h2>Liste des Voyages</h2>
      <div className="voyages-grid">
        {voyages.map(voyage => (
          <div className="voyage-card" key={voyage._id}>
            <div className="title">
              {voyage.vehicule?.parc.localisation} → {voyage.destination}
            </div>
            <div className="infos">
              {new Date(voyage.date_depart).toLocaleDateString()} à {voyage.heure_depart}
            </div>
            <div className="conducteur">
              <FaUser /> Conducteur : {voyage.chauffeur?.nom || 'Inconnu'}
            </div>
            <div className="vehicule">
              <FaBus /> Véhicule : {voyage.vehicule?.modele} ({voyage.vehicule?.immatriculation})
            </div>

            <div className={`statut ${voyage.statut === 'En cours' ? 'en-cours' : 'termine'}`}>
              {voyage.statut}
            </div>

            <button
              onClick={() => handleReservation(voyage._id)}
              className="btn-reserver"
            >
              <FaCheck /> Réserver
            </button>

            <div className="commentaires-section">
              <CommentaireForm
                voyageId={voyage._id}
                userId={user._id}
                onCommentaireCree={refreshCommentaires}
              />
              <CommentairesSection voyageId={voyage._id} key={refresh} user={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoyagesList;
