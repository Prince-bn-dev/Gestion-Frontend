import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVehiculeById, deleteVehicule, deleteVehiculeImage } from '../../api/vehiculeApi';
import { FaCar,FaRoad,FaMapMarkerAlt,FaUser,FaPen,FaTrash,FaPlus,} from 'react-icons/fa';
import AddChauffeurToVehicule from './AddChauffeurToVehicule';
import VehiculeForm from './VehiculeForm';
import MapGPS from '../pages/MapGPS';
import Loader from '../Loader';
import Modal from '../../uikits/Modal';
import UploadImagesModal from './UploadImagesModal';
import { toast } from 'react-toastify';

function VehiculeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicule, setVehicule] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showChauffeurModal, setShowChauffeurModal] = useState(false);
  const [showEditVehiculeModal, setShowEditVehiculeModal] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  

  const fetchVehicule = async () => {
    try {
      const res = await getVehiculeById(id);
      setVehicule(res.data);
      setImages(res.data.images || []);
    } catch (err) {
      toast.info('Véhicule introuvable');
      navigate('/vehicules');
    }
  };

  useEffect(() => {
    fetchVehicule();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce véhicule ?')) {
      try {
        await deleteVehicule(id);
        toast.success('Véhicule supprimé avec succès');
        navigate('/vehicules');
      } catch (err) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const getStatusClass = (statut) => {
    switch (statut) {
      case 'actif':
        return 'disponible';
      case 'maintenance':
        return 'maintenance';
      case 'hors_service':
        return 'hors-service';
      default:
        return '';
    }
  };

  if (!vehicule) return <Loader />;

  return (
    <div className="vehicule-detail-container">
      <div className="header">
        <h2>{vehicule.immatriculation}</h2>
        <span className={`status-badge ${getStatusClass(vehicule.statut)}`}>
          {vehicule.statut}
        </span>
      </div>

      <p className="sub">
        {vehicule.marque} {vehicule.modele}
      </p>
      <div className='infos-gallery'>
        <div className="vehicule-gallery">
          <div className="gallery-main">
            <button
              className="nav-button left"
              onClick={() =>
                setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
            >
              ←
            </button>

            {images.length > 0 ? (
              <img src={images[currentImage].url} alt="Vehicule" className="main-image" />
            ) : (
              <div className="placeholder">Aucune image</div>
            )}

            <button
              className="nav-button right"
              onClick={() =>
                setCurrentImage((prev) => (prev + 1) % images.length)
              }
            >
              →
            </button>
          </div>

          {images.length > 0 && (
            <div className="gallery-thumbs">
              {images.map((img, index) => (
                <div key={index} className="thumb-wrapper">
                  <img
                    src={img.url}
                    alt="miniature"
                    className={currentImage === index ? 'thumb selected' : 'thumb'}
                    onClick={() => setCurrentImage(index)}
                  />
                  <button
                    className="delete-thumb-btn"
                    onClick={async () => {
                      if (window.confirm("Supprimer cette image ?")) {
                        try {
                          await deleteVehiculeImage(id, img._id);
                          await fetchVehicule(); 
                          setCurrentImage((prev) =>
                            prev >= images.length - 1 ? images.length - 2 : prev
                          );
                        } catch (err) {
                          toast.error("Erreur suppression image");
                        }
                      }
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => setShowImageUploadModal(true)}
          >
            Modifier les images
          </button>

        </div>

        <div className="infos">
          <div className="vehicule-info">
          <p><FaCar /> {vehicule.type}</p>
          <p><FaRoad /> {vehicule.kilometrage?.toLocaleString()} km</p>
          <p>
            <FaMapMarkerAlt className="gps" /> GPS{' '}
            {vehicule.gps?.type === 'gps' ? 'activé' : 'désactivé'}
          </p>
        </div>
              <div className="additional-info">
        <p>
          <FaUser /> <strong>Chauffeur :</strong>{' '}
          {vehicule.chauffeur
            ? `${vehicule.chauffeur.nom} ${vehicule.chauffeur.prenom}`
            : 'Aucun'}
          <button
            className="btn-inline"
            onClick={() => setShowChauffeurModal(true)}
            title={vehicule.chauffeur ? 'Modifier chauffeur' : 'Ajouter chauffeur'}
          >
            {vehicule.chauffeur ? <FaPen /> : <FaPlus />}
          </button>
        </p>
        <p><strong>Parc :</strong> {vehicule.parc?.nom || 'Aucun'}</p>
        <p><strong>Capacité :</strong> {vehicule.capacite} places</p>
        <p><strong>Climatisation :</strong> {vehicule.climatisation ? 'Oui' : 'Non'}</p>
        <p><strong>Chargeur :</strong> {vehicule.chargeur ? 'Oui' : 'Non'}</p>
      </div>
        </div>
      </div>

      <div className="buttons">
        <button className="btn" onClick={() => setShowEditVehiculeModal(true)}>
          <FaPen /> Modifier véhicule
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          <FaTrash /> Supprimer
        </button>
        <Link to="/vehicules" className="btn">Retour</Link>
      </div>

      {showChauffeurModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowChauffeurModal(false)}
          title={vehicule.chauffeur ? 'Modifier chauffeur' : 'Ajouter chauffeur'}
        >
          <AddChauffeurToVehicule
            vehiculeId={id}
            onSuccess={() => {
              setShowChauffeurModal(false);
              fetchVehicule();
            }}
          />
        </Modal>
      )}

      {showEditVehiculeModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowEditVehiculeModal(false)}
          title="Modifier le véhicule"
        >
          <VehiculeForm
            id={vehicule._id}
            onClose={() => {
              setShowEditVehiculeModal(false);
              fetchVehicule();
            }}
          />
        </Modal>
      )}

      {showImageUploadModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowImageUploadModal(false)}
          title="Ajouter des images"
        >
          <UploadImagesModal
            vehiculeId={id}
            onClose={() => setShowImageUploadModal(false)}
            onUploadSuccess={fetchVehicule}
          />
        </Modal>
      )}


      <MapGPS vehiculeId={id} />
    </div>
  );
}

export default VehiculeDetail;
