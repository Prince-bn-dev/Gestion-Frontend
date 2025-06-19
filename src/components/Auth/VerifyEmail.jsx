import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
 

function VerifyEmail() {
  const { emailToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); 

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/user/verifyEmail/${emailToken}`);
        console.log(response.data.message || 'Email vérifié avec succès.');
        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } catch (err) {
        const errMsg = err.response?.data?.message || 'Erreur réseau. Veuillez réessayer.';
        console.log(errMsg);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [emailToken, navigate]);

  return (
    <div className="verify-email">
        <h1>Vérification de l'Email</h1>
        <div className="verify-email-container">
        {status === 'loading' && (
            <div className="loading">
            <div className="spinner" />
            <p>Vérification de votre email en cours...</p>
            </div>
        )}

        {status === 'success' && (
            <div className="success">
            <h2>Félicitations !</h2>
            <p>Vous allez être redirigé vers la page de connexion dans quelques secondes.</p>
            <Link to="/login" className="btn">
                Aller à la connexion maintenant
            </Link>
            </div>
        )}

        {status === 'error' && (
            <div className="error">
            <h2>Oups !</h2>
            <button className="btn" onClick={() => window.location.reload()}>
                Réessayer
            </button>
            <Link to="/register" className="btn-link">
                S'inscrire à nouveau
            </Link>
            </div>
        )}
        </div>
    </div>
  );
}

export default VerifyEmail;
