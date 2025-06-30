import React from 'react';
import { FaUser, FaEnvelope, FaPaperPlane, FaUserEdit } from 'react-icons/fa';
import { BackgroundButton } from '../uikits/Button';


function Contact() {
  return (
    <div className="Contact">
      <div className="C-header">
        <h1>CONTACT</h1>
      </div>
      <div className="C-container">
        <div className="C-left">
          <img src="/contact.gif" alt="Contact Illustration" />
        </div>
        <div className="C-right">
          <h2>Formulaire de contact</h2>
          <form>
            <div>
              <label htmlFor="Name"><FaUser /> Nom <span>*</span></label>
              <input type="text" name="Name" required />
            </div>
            <div>
              <label htmlFor="LastName"><FaUserEdit /> Prénom <span>*</span></label>
              <input type="text" name="LastName" required />
            </div>
            <div>
              <label htmlFor="Email"><FaEnvelope /> Email <span>*</span></label>
              <input type="email" name="Email" required />
            </div>
            <div>
              <label htmlFor="Message"><FaEnvelope />Message <span>*</span></label>
              <textarea name="Message" id="Message" required></textarea>
            </div>
            <BackgroundButton text={"Envoyer"} icon={<FaPaperPlane />} type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
