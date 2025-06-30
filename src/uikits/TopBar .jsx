import React from "react";
import { FaSearch, FaBell, FaUserCircle, FaSun, FaCog } from "react-icons/fa";

const TopBar = ({ currentLabel }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{currentLabel}</h2>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <span>Home</span>
          <span className="sep">›</span>
          <span>{currentLabel}</span>
          <span className="sep">›</span>
          <span>Default</span>
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
