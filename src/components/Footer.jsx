import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaGooglePlusG } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column">
          <img src="/logo.png" alt="GCON Logo" className="footer__logo" />
            <p>Auto-Track est une application de gestion de flotte de véhicules qui vous permet de suivre et gérer vos véhicules, conducteurs et parcings en toute simplicité.</p>
            
          <div className="footer__social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaGooglePlusG /></a>
          </div>
        </div>

        <div className="footer__column">
            <h4>Liens Rapides</h4>
          <ul>
            <li><a href="/">Acceuil</a></li>
            <li><a href="/about">A-Propos</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Newsletter</h4>
          <form className="footer__form">
            <input type="email" placeholder="Email Address" />
            <button type="submit">Envoyer</button>
          </form>
          <h4>A-PROPOS</h4>
          <p>
            Auto-Track est une application de gestion de flotte de véhicules qui vous permet de suivre et gérer vos véhicules, conducteurs et parcings en toute simplicité.
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Auto-Track. All rights reserved.</p>
        <p>Designed by <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">Prince DOSSOU</a></p>
      </div>
    </footer>
  );
};

export default Footer;
