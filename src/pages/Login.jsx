import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ReactFlagsSelect from 'react-flags-select';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhoneAlt } from 'react-icons/fa';
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

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("EMAIL");
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [country, setCountry] = useState('BJ');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModeChange = (e) => {
    setMode(e.target.id);
    setEmail('');
    setTelephone('');
    setMotDePasse('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const identifiant = mode === 'EMAIL' ? email : telephone;

    if (!identifiant || !motDePasse) {
      toast.info('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    const dialCode = dialCodes[country] || '';
    const cleanedNumber = telephone.replace(/^0+/, '');
    const fullPhone = `${dialCode}${cleanedNumber}`;

    try {
      const finalIdentifiant = mode === 'EMAIL' ? email : fullPhone;
      await login(finalIdentifiant, motDePasse);
      toast.success('Connexion réussie !');
      navigate('/profile');
    } catch (err) {
      toast.error('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="left">
        <img src="/login.jpg" alt="Login" />
      </div>
      <div className="container" aria-live="polite">
        <h1>Connexion</h1>
        <ul className="login__selector">
          <li onClick={handleModeChange} id="EMAIL" className={mode === 'EMAIL' ? "active" : ""}>Par Email</li>
          <li onClick={handleModeChange} id="TELEPHONE" className={mode === 'TELEPHONE' ? "active" : ""}>Par Téléphone</li>
        </ul>

        <form onSubmit={handleLogin} noValidate>
          {mode === 'EMAIL' && (
            <>
              <label htmlFor="email">Email</label>
              <div className="inputGroup">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {mode === 'TELEPHONE' && (
            <>
              <label>Pays</label>
              <ReactFlagsSelect
                countries={africanCountryCodes}
                selected={country}
                onSelect={code => setCountry(code)}
                className="flag-select"
                searchable
                searchPlaceholder="Rechercher un pays"
              />

              <label htmlFor="telephone">Téléphone</label>
              <div className="inputGroup">
                <FaPhoneAlt className="icon" />
                <input
                  type="tel"
                  id="telephone"
                  placeholder="Numéro de téléphone"
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <label htmlFor="motDePasse">Mot de passe</label>
          <div className="inputGroup">
            <FaLock className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="motDePasse"
              value={motDePasse}
              onChange={e => setMotDePasse(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
            <button
              type="button"
              className="toggleBtn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>
        </form>

        <p className="forgot">
          <Link to="/forgotPassword">Mot de passe oublié ?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
