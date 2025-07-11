import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TrajetForm = ({ onSuccess, editingTrajet }) => {
  const [form, setForm] = useState({
    lieux_depart: '',
    lieux_arrive: '',
    distance: 0,
    heures: '',     
    minutes: '',    
  });

  const parseDuree = (dureeStr) => {
    const regex = /(?:(\d+)h)?\s*(?:(\d+)min)?/i;
    const match = regex.exec(dureeStr || '');
    return {
      heures: match?.[1] || '',
      minutes: match?.[2] || '',
    };
  };

  useEffect(() => {
    if (editingTrajet) {
      const { heures, minutes } = parseDuree(editingTrajet.duree);
      setForm({
        lieux_depart: editingTrajet.lieux_depart,
        lieux_arrive: editingTrajet.lieux_arrive,
        distance: editingTrajet.distance,
        heures,
        minutes,
      });
    }
  }, [editingTrajet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dureeStr = `${form.heures ? form.heures + 'h' : ''}${form.minutes ? form.minutes + 'min' : ''}`;

    const payload = {
      lieux_depart: form.lieux_depart,
      lieux_arrive: form.lieux_arrive,
      distance: form.distance,
      duree: dureeStr,
    };

    try {
      if (editingTrajet) {
        await axios.put(`${import.meta.env.VITE_API_URL}api/trajets/${editingTrajet._id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}api/trajets`, payload);
      }

      setForm({ lieux_depart: '', lieux_arrive: '', distance: 0, heures: '', minutes: '' });
      onSuccess();
    } catch (err) {
      toast.error("Erreur d'envoi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trajet-form">
      <input
        type="text"
        name="lieux_depart"
        value={form.lieux_depart}
        onChange={handleChange}
        placeholder="Lieu de départ"
        required
      />
      <input
        type="text"
        name="lieux_arrive"
        value={form.lieux_arrive}
        onChange={handleChange}
        placeholder="Lieu d'arrivée"
        required
      />
      <input
        type="number"
        name="distance"
        value={form.distance}
        onChange={handleChange}
        placeholder="Distance (km)"
        required
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="number"
          name="heures"
          value={form.heures}
          onChange={handleChange}
          placeholder="Heures"
          min="0"
        />
        <input
          type="number"
          name="minutes"
          value={form.minutes}
          onChange={handleChange}
          placeholder="Minutes"
          min="0"
          max="59"
        />
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>
        {editingTrajet ? 'Mettre à jour' : 'Créer'}
      </button>
    </form>
  );
};

export default TrajetForm;
