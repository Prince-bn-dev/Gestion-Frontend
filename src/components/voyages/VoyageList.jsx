import React, { useEffect, useState } from 'react';
import { getAllVoyages } from '../../api/voyageApi';
import { createReservation } from '../../api/reservationApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBus, FaCheck, FaImages } from 'react-icons/fa';
import CommentaireForm from '../commentaires/CommentaireForm';
import CommentairesSection from '../commentaires/CommentairesSection';
import Modal from '../../uikits/Modal';
import Loader from '../Loader';
import { toast } from 'react-toastify';

function VoyagesList() {
  const [voyages, setVoyages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
 const filteredVoyages = voyages.filter((voyage) => {
  const depart = voyage.trajet?.lieux_depart?.toLowerCase() || '';
  const arrive = voyage.trajet?.lieux_arrive?.toLowerCase() || '';
  const term = searchTerm.toLowerCase();
  return depart.includes(term) || arrive.includes(term);
});

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
    }
  };

  const handleOpenImages = (images) => {
    if (!images || images.length === 0) return;
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setShowImageModal(true);
  };

  const handleCloseImages = () => {
    setShowImageModal(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  if (loading) return <div><Loader /></div>;

  return (
    <div className="voyages-list-container">
      <h2>Liste des Voyages</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par lieu de départ ou d’arrivée..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="voyages-grid">
        {filteredVoyages.map((voyage) => (
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
              {voyage.vehicule?.images?.length > 0 && (
                <FaImages
                  title="Voir les images"
                  style={{ marginLeft: 8, cursor: 'pointer', color: '#555' }}
                  onClick={() => handleOpenImages(voyage.vehicule.images)}
                />
              )}
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
      {showImageModal && (
        <Modal isOpen={true} onClose={handleCloseImages} title="Images du véhicule">
          <div className="vehicule-gallery">
            <div className="gallery-main">
              <button
                className="nav-button left"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? selectedImages.length - 1 : prev - 1
                  )
                }
              >
                ←
              </button>

              {selectedImages.length > 0 ? (
                <img
                  src={selectedImages[currentImageIndex].url}
                  alt="Véhicule"
                  className="main-image"
                  style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '10px' }}
                />
              ) : (
                <div className="placeholder">Aucune image</div>
              )}

              <button
                className="nav-button right"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length)
                }
              >
                →
              </button>
            </div>

            {selectedImages.length > 0 && (
              <div className="gallery-thumbs">
                {selectedImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`thumb-${index}`}
                    className={index === currentImageIndex ? 'thumb selected' : 'thumb'}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      margin: '8px',
                      border: index === currentImageIndex ? '3px solid #007bff' : '2px solid #ccc',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default VoyagesList;
