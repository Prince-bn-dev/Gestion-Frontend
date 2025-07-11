import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 

function UpdatePasswordForm() {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      return toast.info('Les nouveaux mots de passe ne correspondent pas');
    }

    try {
      const token = localStorage.getItem('token'); 

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/user/password/update`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success( 'Mot de passe mis à jour avec succès');
      setForm({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setTimeout(() => {
        navigate('/profile'); 
      }, 2000);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du mot de passe');
    }
  };

  return (
    <div className='update-password'>
      <h2>Changer le mot de passe</h2>
      <p>Entrez votre mot de passe actuel et le nouveau mot de passe.</p> 
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Mot de passe actuel"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirmer le nouveau mot de passe"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
