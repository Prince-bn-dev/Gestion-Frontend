import React, { useState } from 'react'
import AvisSlider from '../components/pages/AvisSlider'

function About() {
  return (
    <div className='About'>
     <header className="about-header">
        <h1>A PROPOS</h1>
      </header>

      <div className="about-container">
        <section className="about-text">
          <h2>Qui sommes-nous ?</h2>
          <p>
            <i>Auto-Track </i>est une solution innovante dédiée à la gestion intelligente des véhicules et parcs automobiles.
            Nous offrons un suivi précis, une maintenance proactive, et des rapports détaillés pour optimiser votre flotte.
          </p>
          <p>
            Notre équipe d’experts passionnés travaille chaque jour pour vous fournir une plateforme intuitive, fiable et sécurisée,
            adaptée aux besoins des gestionnaires, chauffeurs et voyageurs.
          </p>
        </section>
        <section className="about-image">
          <img src="/public/logo.png" alt="Logo Auto-Track" />
        </section>
      </div>

      <div className="services">
        <header>
          <h2>Nos Services</h2>
        </header>
        <div className="services-list">
          <div className="service-item">
            <img src="/public/images/icone1.png" alt="Gestion des véhicules" />
            <div>
              <h3>Gestion des véhicules</h3>
              <p>
                Suivez en temps réel l’état, l’utilisation et le kilométrage de chaque véhicule pour une gestion optimale.
              </p>
            </div>
          </div>
          <div className="service-item">
            <img src="/public/images/icone2.png" alt="Gestion des parkings" />
            <div>
              <h3>Gestion des parkings</h3>
              <p>
                Organisez et contrôlez l’accès à vos parcs automobiles avec des outils simples et efficaces.
              </p>
            </div>
          </div>
          <div className="service-item">
            <img src="/public/images/icone3.png" alt="Suivi maintenance" />
            <div>
              <h3>Suivi maintenance</h3>
              <p>
                Planifiez et suivez les opérations de maintenance pour garantir la sécurité et la durabilité de vos véhicules.
              </p>
            </div>
          </div>
          <div className="service-item">
            <img src="/public/images/icone4.png" alt="Rapports et analyses" />
            <div>
              <h3>Rapports et analyses</h3>
              <p>
                Bénéficiez de rapports détaillés pour prendre des décisions éclairées et optimiser vos coûts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="team">
        <h2>Notre Équipe</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/public/personnes/mecano1.jpg" alt="Ange G" />
            <h3>Ange G.</h3>
            <p>Développeur Frontend</p>
          </div>
          <div className="team-member">
            <img src="/public/personnes/passager2.jpg" alt="Ange G" />
            <h3>Ange G.</h3>
            <p>Développeur Backend</p>
          </div>
          <div className="team-member">
            <img src="/public/personnes/passager1.jpg" alt="Ange G" />
            <h3>Ange G.</h3>
            <p>Manager</p>
          </div>
        </div>
      </div>
      <AvisSlider />
    </div>
  )
}

export default About