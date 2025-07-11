import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UploadImagesModal = ({ vehiculeId, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('file', file);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}api/vehicules/${vehiculeId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess();
      onClose();
      toast.success("Upload d'image réussie")
    } catch (error) {
      toast.error("Erreur upload d'image");
    }
  };

  return (
    <div className="upload-images-modal">
      <h3>Ajouter des images</h3>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <div className="modal-buttons">
        <button onClick={handleUpload} className="btn">Uploader</button>
        <button onClick={onClose} className="btn btn-secondary">Annuler</button>
      </div>
    </div>
  );
};

export default UploadImagesModal;
