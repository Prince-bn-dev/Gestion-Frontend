import React, { useState } from 'react';
import axios from 'axios';
 
import ReactFlagsSelect from 'react-flags-select';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const africanCountryCodes = [
  "ZA", "DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "KM",
  "CG", "CD", "CI", "DJ", "EG", "ER", "SZ", "ET", "GA", "GM",
  "GH", "GN", "GW", "GQ", "KE", "LS", "LY", "MG", "MW", "ML",
  "MU", "MR", "MZ", "NA", "NE", "NG", "UG", "RW", "ST", "SN",
  "SC", "SL", "SO", "SD", "SS", "TZ", "TD", "TG", "TN", "ZM", "ZW"
];

const dialCodes = {
  ZA: "+27", DZ: "+213", AO: "+244", BJ: "+229", BW: "+267", BF: "+226",
  BI: "+257", CM: "+237", CV: "+238", KM: "+269", CG: "+242", CD: "+243",
  CI: "+225", DJ: "+253", EG: "+20", ER: "+291", SZ: "+268", ET: "+251",
  GA: "+241", GM: "+220", GH: "+233", GN: "+224", GW: "+245", GQ: "+240",
  KE: "+254", LS: "+266", LY: "+218", MG: "+261", MW: "+265", ML: "+223",
  MU: "+230", MR: "+222", MZ: "+258", NA: "+264", NE: "+227", NG: "+234",
  UG: "+256", RW: "+250", ST: "+239", SN: "+221", SC: "+248", SL: "+232",
  SO: "+252", SD: "+249", SS: "+211", TZ: "+255", TD: "+235", TG: "+228",
  TN: "+216", ZM: "+260", ZW: "+263"
};

function ForgotPassword() {
  const [mode, setMode] = useState("EMAIL");
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [country, setCountry] = useState('BJ');
  const [loading, setLoading] = useState(false);

  const handleModeChange = (e) => {
    setMode(e.target.id);
    setEmail('');
    setTelephone('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dialCode = dialCodes[country] || '';
    const cleanedPhone = telephone.replace(/^0+/, '');
    const identifiant = mode === 'EMAIL' ? email : `${dialCode}${cleanedPhone}`;

    if (!identifiant) {
      toast.info("Veuillez entrer un identifiant valide.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/user/forgotPassword`, {
        identifiant
      });
      toast.success('identifiant valide');
    } catch (err) {
      const message ="Échec de la réinitialisation.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Réinitialiser le mot de passe</h2>
      <ul className="mode-selector">
        <li onClick={handleModeChange} id="EMAIL" className={mode === 'EMAIL' ? 'active' : ''}>
          Par Email
        </li>
        <li onClick={handleModeChange} id="TELEPHONE" className={mode === 'TELEPHONE' ? 'active' : ''}>
          Par Téléphone
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="forgot-form">
        {mode === 'EMAIL' && (
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'TELEPHONE' && (
          <>
            <ReactFlagsSelect
              countries={africanCountryCodes}
              selected={country}
              onSelect={(code) => setCountry(code)}
              className="flag-select"
              searchable
              searchPlaceholder="Rechercher un pays"
            />
            <div className="input-group">
              <FaPhoneAlt />
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le lien / code"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
