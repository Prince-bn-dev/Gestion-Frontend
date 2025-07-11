import React from 'react';
import CustomPaging from '../components/pages/Customer';
import AvisSlider from '../components/pages/AvisSlider';
import TestMap from '../components/pages/TestMap';
import { BackgroundButton } from '../uikits/Button';
import Slider from "react-slick";
import Trajet from '../components/pages/Trajet';


function Home() {
  const marque = [
    { name:"Toyota" , image:"/images/V-2.png" },
    { name:"Lexus" , image:"/images/V-3.png" },
    { name:"Nissan" , image:"/images/V-4.png" },
    { name:"Hyundai" , image:"/images/V-5.png" },
    { name:"Honda" , image:"/images/V-6.png" },
    { name:"Mercedeces" , image:"/images/V-7.png" },
    { name:"Ford" , image:"/images/V-8.png" },
    { name:"BMW" , image:"/images/V-9.png" },
  ]


   const settings = {
    dots: false,
    infinite: true,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
     responsive: [
      {
        breakpoint: 758,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    };
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
          <BackgroundButton isLink={true} link={"/login"} text={"Commencer maintenant"} />
        </div>
      </header>
      <Trajet />
         <section className="about-section">
            <h2>Pourquoi choisir notre solution ?</h2>
          <div className='about-container'>
            <section>
              <span>
              <h3>Optimisation de votre flotte</h3>
              <p>
                Suivez en temps réel l’état de vos véhicules et planifiez les opérations de maintenance avant qu’elles ne deviennent critiques. 
                Notre système vous aide à prolonger la durée de vie de votre flotte tout en minimisant les coûts imprévus.
              </p>
              <img src="./images/bus2.png" alt="" />
              </span>
              <img src="./voiture/b2.jpg" alt="" />
            </section>

            <section >
              <img src="./aboutimg/a2.jpg" alt="" />
              <span>
              <h3>Gestion intelligente des réservations</h3>
              <p>
                Grâce à notre module de réservation intégré, affectez automatiquement les véhicules disponibles selon la demande. 
                Gérez les priorités, les trajets et les conducteurs en quelques clics.
              </p>
              <img src="./images/bus2.png" alt="" />

              </span>
            </section>

            <section>
              <span>
              <h3>Analyse et rapports détaillés</h3>
              <p>
                Prenez des décisions éclairées grâce à des tableaux de bord dynamiques et des rapports personnalisés. 
                Suivez les performances par parc, par véhicule ou par conducteur pour ajuster votre stratégie au quotidien.
              </p>
              <img src="./images/bus2.png" alt="" />

              </span>
              <img src="./aboutimg/a3.jpg" alt="" />
            </section>

            <section className='one'>
            <img src="./aboutimg/a4.jpg" alt="" />
            <span>
            <h3>Expérience utilisateur moderne</h3>
              <p>
                Notre interface épurée et responsive s’adapte à tous les supports, garantissant une utilisation fluide pour les gestionnaires comme pour les utilisateurs. 
                La navigation est rapide, intuitive et pensée pour les besoins opérationnels.
              </p>
              <img src="./images/bus2.png" alt="" />

            </span>
            </section>
          </div>
          <TestMap />
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
        <Slider {...settings}>
          {marque.map((item, index) => {
            return (
              <div key={index + 2} className="marque-item">
                <img src={item.image} alt={item.name} />
              </div>
            );
          })}
        </Slider>
         </div>
      </div>
      <AvisSlider />
    </div>
  );
}

export default Home;
