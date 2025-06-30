import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrajetForm = ({ onSuccess, editingTrajet }) => {
  const [form, setForm] = useState({ lieux_depart: '', lieux_arrive: '' });

  useEffect(() => {
    if (editingTrajet) {
      setForm({
        lieux_depart: editingTrajet.lieux_depart,
        lieux_arrive: editingTrajet.lieux_arrive,
      });
    }
  }, [editingTrajet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrajet) {
        await axios.put(`${import.meta.env.VITE_API_URL}api/trajets/${editingTrajet._id}`, form);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}api/trajets`, form);
      }
      setForm({ lieux_depart: '', lieux_arrive: '' });
      onSuccess();
    } catch (err) {
      console.error("Erreur d'envoi :", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trajet-form">
      <input type="text" name="lieux_depart" value={form.lieux_depart} onChange={handleChange} placeholder="Lieu de départ" required />
      <input type="text" name="lieux_arrive" value={form.lieux_arrive} onChange={handleChange} placeholder="Lieu d'arrivée" required />
      <button type="submit">{editingTrajet ? 'Mettre à jour' : 'Créer'}</button>
    </form>
  );
};

export default TrajetForm;
