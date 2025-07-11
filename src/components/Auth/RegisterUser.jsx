import React, { useState } from 'react';
import axios from 'axios';
import ReactFlagsSelect from 'react-flags-select';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

function RegisterUser() {
  const [mode, setMode] = useState("EMAIL");
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('BJ');
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [role, setRole] = useState('voyageur');
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth(); 
  const navigate = useNavigate();
  const handleModal = (e) => {
    setMode(e.target.id);
    setEmail('');
    setTelephone('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !prenom || !motDePasse) {
      toast.info("Veuillez remplir tous les champs.");
      return;
    }

    if (mode === "EMAIL" && !email) {
      toast.info("Veuillez entrer votre email.");
      return;
    }

    if (mode === "TELEPHONE" && !telephone) {
      toast.info("Veuillez entrer votre numéro de téléphone.");
      return;
    }

    if (motDePasse !== confirmMotDePasse) {
      toast.info("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptedTerms) {
      toast.info("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setLoading(true);
    const dialCode = dialCodes[country] || '';
    const cleanedNumber = telephone.replace(/^0+/, '');
    const fullPhone = mode === "TELEPHONE" ? `${dialCode}${cleanedNumber}` : undefined;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}api/user/register`, {
        nom,
        prenom,
        email: mode === "EMAIL" ? email : undefined,
        telephone: fullPhone,
        motDePasse,
        role,
      });

      if (mode === "TELEPHONE") {
        navigate(`/verification-telephone?numero=${fullPhone}`);
      } else {
         toast.error('Erreur de connexion.');
      }

      toast.success('Enregistrement réussie');
    } catch (err) {
      const message = "Erreur d'inscription.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Register">
      <div className='register'>
         <div className="register__header">
        <img src="/logo.png" alt="logo" />
        <h1>Créer un compte pour utilisateur</h1>
      </div>

      <ul className="register__selector">
        <li onClick={handleModal} id="EMAIL" className={mode === 'EMAIL' ? "active" : ""}>
          S'inscrire par Email
        </li>
        <li onClick={handleModal} id="TELEPHONE" className={mode === 'TELEPHONE' ? "active" : ""}>
          S'inscrire par Téléphone
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="register__form" noValidate>
        <div className="input-group">
          <FaUser />
          <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="input-group">
          <FaUser />
          <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        {
          token && user && user.role === 'admin' && (
            <div className="input-group">
              <select id="role" placeholder="Rôle" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="voyageur">Voyageur</option>
                <option value="gestionnaire">Gestionnaire</option>
                <option value="chauffeur">Chauffeur</option>
              </select>
            </div>
          )
        }
        {
          token && user && user.role === 'gestionnaire' && (
            <div className="input-group">
              <select id="role" placeholder="Rôle"  value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="voyageur">Voyageur</option>
                <option value="chauffeur">Chauffeur</option>
              </select>
            </div>
          )
        }
        {mode === 'EMAIL' && (
          <div className="input-group">
            <FaEnvelope />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        )}

        {mode === 'TELEPHONE' && (
          <>
            <ReactFlagsSelect
              countries={africanCountryCodes}
              selected={country}
              onSelect={code => setCountry(code)}
              className="flag-select"
              placeholder="Sélectionnez un pays"
              searchable
              searchPlaceholder="Rechercher un pays"
            />
            <div className="input-group">
              <FaPhoneAlt />
              <input type="tel" placeholder="Numéro de téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
            </div>
          </>
        )}

        <div className="input-group">
          <FaLock />
          <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        </div>

        <div className="input-group">
          <FaLock />
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmMotDePasse} onChange={(e) => setConfirmMotDePasse(e.target.value)} required />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} required />
          <label htmlFor="terms">
            J'accepte les <a href="/terms" target="_blank">conditions</a> et la <a href="/privacy" target="_blank">confidentialité</a>.
          </label>
        </div>
          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : "S'inscrire"}
          </button>
      </form>

      </div>
    </div>
  );
}

export default RegisterUser;

