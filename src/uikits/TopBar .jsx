import React from "react";
import { useLocation } from "react-router-dom";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa";

const routeLabels = {
  "/dashboard": "Tableau de bord",
  "/allparcs": "Tous les parcs",
  "/parcs": "Parcs",
  "/vehicules": "Véhicules",
  "/allVehicules": "Table des véhicules",
  "/voyages": "Mes voyages",
  "/voyages/new": "Nouveau voyage",
  "/voyages/edit": "Modifier voyage",
  "/allVoyages": "Liste des voyages",
  "/allVoyagesTable": "Table des voyages",
  "/trajets": "Trajets",
  "/register": "Nouvel utilisateur",
  "/profile": "Mon profil",
  "/password/update": "Changer mot de passe",
  "/mes-reservations": "Mes réservations",
  "/reservations/paiement": "Paiement",
  "/reservations/edit": "Modifier réservation"
};

const TopBar = () => {
  const location = useLocation();

  const currentLabel = Object.keys(routeLabels).find((key) =>
    location.pathname.startsWith(key)
  );

  const label = routeLabels[currentLabel] || "Tableau de bord";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{label}</h2>
        <hr />
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <span>Accueil</span>
          <span className="sep">›</span>
          <span>{label}</span>
        </nav>
      </div>
      <div className="topbar-right">
        <button aria-label="Paramètres" className="icon-btn"><FaCog /></button>
        <button aria-label="Notifications" className="icon-btn notif">
          <FaBell />
          <span className="notif-dot">3</span>
        </button>
        <button aria-label="Profil utilisateur" className="icon-btn"><FaUserCircle /></button>
      </div>
    </header>
  );
};

export default TopBar;
