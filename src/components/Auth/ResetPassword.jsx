import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
 


function ResetPassword() {
    const { resetToken } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/resetPassword/${resetToken}`, {
                newPassword
            });
            toast.success('Mot de passe réinitialisé avec succès.');
            setNewPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            toast.error('Échec de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Réinitialiser votre mot de passe</h2>
            <p className="instruction">
                Veuillez saisir un nouveau mot de passe sécurisé. Celui-ci remplacera l’ancien.
            </p>
            <form onSubmit={handleSubmit} className="reset-form">
                <div className="form-group">
                    <label htmlFor="newPassword">Nouveau mot de passe :</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez votre nouveau mot de passe"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Confirmer</button>
            </form>
        </div>
    );
}

export default ResetPassword;
