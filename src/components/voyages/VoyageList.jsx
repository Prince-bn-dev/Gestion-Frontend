import React, { useEffect, useState } from 'react';
import { getAllVoyages } from '../../api/voyageApi';
import { createReservation } from '../../api/reservationApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
        console.error("Erreur lors du chargement des voyages", err);
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
      console.log("Réservation créée. Veuillez procéder au paiement.");
      navigate(`/reservations/paiement/${res._id}`);
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
    }
  };

  if (loading) return <div>Chargement des voyages...</div>;

  return (
    <div className="voyages-list-container">
      <h2>Liste des Voyages</h2>

      <div className="voyages-grid">
        {voyages.map(voyage => (
          <div className="voyage-card" key={voyage._id}>
            <h3 className="title">
              {voyage.trajet?.lieux_depart} → {voyage.trajet?.lieux_arrive}
            </h3>

            <div className="infos">
              <strong>Date :</strong> {new Date(voyage.date_depart).toLocaleDateString()}<br />
              <strong>Heure départ :</strong> {voyage.heure_depart}<br />
              <strong>Heure arrivée estimée :</strong> {voyage.heure_arrivee_Estime}<br />
              <strong>Prix :</strong> {voyage.prix_par_place.toLocaleString()} FCFA
            </div>

            <div className="chauffeur">
              <FaUser /> Chauffeur : {voyage.vehicule?.chauffeur?.prenom} {voyage.vehicule?.chauffeur?.nom}
            </div>

            <div className="vehicule">
              <FaBus /> Véhicule : {voyage.vehicule?.marque} {voyage.vehicule?.modele} ({voyage.vehicule?.immatriculation})
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
