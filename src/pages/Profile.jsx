import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { BorderButton } from '../uikits/Button';
import { IoClose } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        toast.error( 'Échec du chargement du profil.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!selectedFile || !(selectedFile instanceof File)) {
      toast.info("Aucun fichier sélectionné ou fichier invalide.");
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', user._id);
    formData.append('nom', user.nom);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}api/user/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setSelectedFile(null);
      setShowModal(false); 
    } catch (err) {
   toast.error('Échec du chargement');

    const errorData = err.response?.data?.error;
    if (errorData) {
      const { format, maxSize, general } = errorData;
      alert([format, maxSize, general].filter(Boolean).join("\n"));
    } else {
      alert("Erreur inattendue lors de l'envoi du fichier.");
    }
  setShowModal(false);
}
  };

  if (loading) return <div className="message loading"><Loader /></div>;
  if (!user) return <div className="message info">Aucune donnée utilisateur disponible.</div>;

  return (
    <div className="profile-container">
        <div className="avatar-container">
          <img
            src={user.image || "/images/default-avatar.png"}
            alt="Avatar"
            className="profil-personne"
          />
          <span className="edit-icon" onClick={() => setShowModal(true)}><FaPencilAlt /></span> 
        </div>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Mettre à jour votre photo</h3>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
            <div className="modal-actions">
              <button onClick={handleUpload} disabled={!selectedFile}>Uploader</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn"><IoClose /></button>
            </div>
            {selectedFile && (
              <div className="preview">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Aperçu"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <p><strong>Nom :</strong> {user.nom}</p>
      <p><strong>Prénom :</strong> {user.prenom}</p>
      {user.email && <p><strong>Email :</strong> {user.email}</p>}
      <p><strong>Rôle :</strong> {user.role}</p>
      {user.telephone && <p><strong>Téléphone :</strong> {user.telephone}</p>}
      <p className="update-password-link">
        <BorderButton link="/password/update" text="Modifier mon mot de passe" isLink={true} />
      </p>
    </div>
  );
}

export default Profile;
