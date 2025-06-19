import React, { useState, useEffect } from 'react';
import axios from 'axios';
 

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

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
        console.log('Profil chargé avec succès');
      } catch (err) {
        if (err.response?.data?.message) {
          console.log(err.response.data.message);
        } else {
          console.log('Échec du chargement du profil.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Prendre le premier fichier sélectionné
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

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
      console.log('Image de profil mise à jour !');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      console.log('Image mise à jour avec succès', res.data);
      setSelectedFile(null);
    } catch (err) {
      console.log('Erreur lors de l\'upload de l\'image');
    }
  };

  if (loading) {
    return <div className="message loading">Chargement du profil...</div>;
  }

  if (!user) {
    return <div className="message info">Aucune donnée utilisateur disponible.</div>;
  }

  return (
    <div className="profile-container">
      <h2>Mon Profil</h2>
      <img
        src={`${import.meta.env.VITE_API_URL}${user.image}` }
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
      />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        style={{ marginBottom: '10px' }}
      />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Mettre à jour l'image
      </button>
      <p><strong>Nom :</strong> {user.nom}</p>
      <p><strong>Prénom :</strong> {user.prenom}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
      <p><strong>Téléphone :</strong> {user.telephone}</p>
      <p className="update-password-link">
        <a href="/password/update">Modifier mon mot de passe</a>
      </p>
    </div>
  );
}

export default Profile;
