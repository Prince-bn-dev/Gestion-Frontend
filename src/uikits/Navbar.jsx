import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/"><img src="/logo.png" alt="Logo" /></a>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href=""></a></li>
            <li><a href="/" onClick={closeMenu}>Accueil</a></li>
            <li><a href="/about" onClick={closeMenu}>À-Propos</a></li>
            <li><a href="/contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/login" className="navbar-link" onClick={closeMenu}>Se connecter</a>
          </li>
          <li className="navbar-item">
            <a href="/register" className="navbar-link" onClick={closeMenu}>S'inscrire</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
