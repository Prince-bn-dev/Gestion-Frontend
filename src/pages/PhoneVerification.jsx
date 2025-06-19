import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PhoneVerification() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const numero = queryParams.get('numero');
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/user/verify-phone`, { code });
      setMessage(res.data.message);
      navigate('/login')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la vérification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phone-verification-container">
      <div className="verification-box">
        <h2>Vérification du numéro</h2>
        <p>Un code a été envoyé à <strong>{numero}</strong></p>

        <input
          type="text"
          placeholder="Code à 6 chiffres"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
        />

        <button onClick={handleVerify} disabled={loading || !code}>
          {loading ? 'Vérification...' : 'Vérifier'}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default PhoneVerification;
