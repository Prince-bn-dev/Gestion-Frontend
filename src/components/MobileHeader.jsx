import React from 'react';
import { FaBars, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const MobileHeader = ({ toggleSidebar }) => {
    const {user} = useAuth()
  return (
    <div className="mobile-menu-icon">
      <FaBars onClick={toggleSidebar} className="icon menu-icon" />

      <div className="search-container">
        <input type="search" placeholder="Rechercher..." />
        <FaSearch className="search-icon" />
      </div>

      <div className="notification-icons">
        <FaBell className="icon notification-icon" />
        <FaEnvelope className="icon message-icon" />
      </div>

    <section className="logo-section">
        <img src={`${import.meta.env.VITE_API_URL}${user.image}` } alt="Logo" />
      </section>
    </div>
  );
};

export default MobileHeader;
