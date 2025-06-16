// src/pages/Home.jsx
import React from 'react';
import CustomPaging from '../components/Customer';
import AvisSlider from '../components/pages/AvisSlider';

function Home() {
  const marque = [
    { name:"Toyota" , image:"/images/v-2.png" },
    { name:"Lexus" , image:"/images/v-3.png" },
    { name:"Nissan" , image:"/images/v-4.png" },
    { name:"Hyundai" , image:"/images/v-5.png" },
    { name:"Honda" , image:"/images/v-6.png" },
    { name:"Mercedeces" , image:"/images/v-7.png" },
    { name:"Ford" , image:"/images/v-8.png" },
    { name:"BMW" , image:"/images/v-9.png" },
  ]
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Bienvenue sur votre gestionnaire de parc automobile</h1>
          <p className="hero-subtitle">
            Simplifiez la gestion de votre flotte, améliorez la productivité et réduisez les coûts.
          </p>
          <p className="hero-slogan">
            <em>« Maîtrisez votre mobilité, maîtrisez votre avenir »</em>
          </p>
          <button className="btn-primary"><a href="/login">Commencer maintenant</a></button>
        </div>
        <br />
        <div className="hero-image">
          <img
            src="/images/v-1.avif"
            alt="Parc automobile"
          />
        </div>
      </header>
      <section className="about-section">
        <h2>Pourquoi choisir notre solution ?</h2>
        <div className='about-container'>
          <section>
        <p>
          Notre plateforme intuitive vous offre un contrôle total sur votre parc automobile. 
          Que vous gériez une petite flotte ou plusieurs centaines de véhicules, nous vous aidons à optimiser chaque aspect : 
          maintenance, disponibilité, réservation, et plus encore.
        </p>
        <p>
          Grâce à des outils puissants et des analyses détaillées, vous pouvez anticiper les besoins, réduire les temps d’arrêt 
          et améliorer la satisfaction de vos utilisateurs.
        </p>
          </section>
         <section>
        <p>
          Notre plateforme intuitive vous offre un contrôle total sur votre parc automobile. 
          Que vous gériez une petite flotte ou plusieurs centaines de véhicules, nous vous aidons à optimiser chaque aspect : 
          maintenance, disponibilité, réservation, et plus encore.
        </p>
        <p>
          Grâce à des outils puissants et des analyses détaillées, vous pouvez anticiper les besoins, réduire les temps d’arrêt 
          et améliorer la satisfaction de vos utilisateurs.
        </p>
          </section>
          <section>
        <p>
          Notre plateforme intuitive vous offre un contrôle total sur votre parc automobile. 
          Que vous gériez une petite flotte ou plusieurs centaines de véhicules, nous vous aidons à optimiser chaque aspect : 
          maintenance, disponibilité, réservation, et plus encore.
        </p>
        <p>
          Grâce à des outils puissants et des analyses détaillées, vous pouvez anticiper les besoins, réduire les temps d’arrêt 
          et améliorer la satisfaction de vos utilisateurs.
        </p>
          </section>
        <section>
        <p>
          Notre plateforme intuitive vous offre un contrôle total sur votre parc automobile. 
          Que vous gériez une petite flotte ou plusieurs centaines de véhicules, nous vous aidons à optimiser chaque aspect : 
          maintenance, disponibilité, réservation, et plus encore.
        </p>
        <p>
          Grâce à des outils puissants et des analyses détaillées, vous pouvez anticiper les besoins, réduire les temps d’arrêt 
          et améliorer la satisfaction de vos utilisateurs.
        </p>
          </section>
        </div>
      </section>
      <CustomPaging />
      <section className="features-section">
        <h2>Fonctionnalités clés</h2>
        <p className="features-intro">
          Découvrez les modules qui rendent la gestion de votre parc simple et efficace.
        </p>
        <div className="features-grid">
          <div className="feature-card fade-in">
            <img
              src="/images/icone1.png"
              alt="Gestion des véhicules"
            />
            <h3>Gestion des véhicules</h3>
            <p>Ajoutez, modifiez et suivez l’état de vos véhicules facilement.</p>
          </div>
          <div className="feature-card fade-in delay-1">
            <img
              src="/images/icone2.png"
              alt="Gestion des parcings"
            />
            <h3>Gestion des parcings</h3>
            <p>Organisez vos parcings et attribuez les places rapidement.</p>
          </div>
          <div className="feature-card fade-in delay-2">
            <img
              src="/images/icone3.png"
              alt="Maintenance"
            />
            <h3>Suivi maintenance</h3>
            <p>Planifiez et suivez les maintenances pour éviter les pannes.</p>
          </div>
          <div className="feature-card fade-in delay-3">
            <img
              src="/images/icone5.png"
              alt="Rapports et analyses"
            />
            <h3>Rapports et analyses</h3>
            <p>Obtenez des insights pour optimiser vos coûts et performances.</p>
          </div>
          <div className="feature-card fade-in delay-4">
            <img
              src="/images/icone4.png"
              alt="Sécurité renforcée"
            />
            <h3>Sécurité renforcée</h3>
            <p>Assurez la conformité et la sécurité de vos véhicules et conducteurs.</p>
          </div>
        </div>
      </section>
      <div className='marque-section'>
        <h2>Top Marque</h2>
        <div className="marque-container">
          {marque.map((item, index) => (
            <div key={index} className="marque-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
         </div>
      </div>
   <AvisSlider />

      <section className="call-to-action">
        <h2>Prêt à transformer la gestion de votre parc ?</h2>
        <p>Rejoignez des centaines de gestionnaires qui nous font déjà confiance.</p>
        <button className="btn-primary"><a href="/login">Créer un compte gratuit</a></button>
      </section>
    </div>
  );
}

export default Home;
