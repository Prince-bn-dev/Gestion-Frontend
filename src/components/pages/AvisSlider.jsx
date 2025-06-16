import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Slider from "react-slick";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Responsable RH chez Altura",
    date: "12 mars 2024",
    image: "/personnes/passager1.jpg",
    message: "Un service client exceptionnel ! J'ai pu réserver en quelques clics et le voyage s’est déroulé sans encombre. Je recommande vivement.",
  },
  {
    name: "Alioune Diop",
    role: "Entrepreneur",
    date: "5 février 2024",
    image: "/personnes/passager1.jpg",
    message: "Je voyage régulièrement pour mes affaires, et cette plateforme m’a vraiment facilité la vie. Interface fluide et conducteurs très professionnels.",
  },
  {
    name: "Sophie N'Guessan",
    role: "Étudiante en droit",
    date: "21 avril 2024",
    image: "/personnes/passager1.jpg",
    message: "J'ai utilisé l'application pour mon retour à l’université. Très pratique, surtout pour suivre le véhicule en temps réel. Continuez ainsi !",
  },
  {
    name: "Jean-Michel Kaboré",
    role: "Consultant en logistique",
    date: "3 janvier 2024",
    image: "/personnes/passager1.jpg",
    message: "Une très bonne solution pour optimiser mes déplacements régionaux. Les tarifs sont abordables et la ponctualité est au rendez-vous.",
  },
  {
    name: "Fatou Bamba",
    role: "Designer graphique",
    date: "18 mai 2024",
    image: "/personnes/passager1.jpg",
    message: "J'ai adoré l'expérience ! Le confort du véhicule, la simplicité de réservation… tout était parfait. Bravo pour cette initiative.",
  },
  {
    name: "Samuel Ayité",
    role: "Développeur web",
    date: "27 mars 2024",
    image: "/personnes/passager1.jpg",
    message: "Enfin une plateforme qui pense aux détails ! L’accès aux informations est clair et les notifications sont utiles.",
  },
  {
    name: "Nadia Zongo",
    role: "Assistante administrative",
    date: "30 avril 2024",
    image: "/personnes/passager1.jpg",
    message: "Le chauffeur était ponctuel, aimable et très professionnel. Je suis ravie du service et je n’hésiterai pas à réserver à nouveau.",
  },
  {
    name: "Jacques Ayé",
    role: "Chef de projet IT",
    date: "10 juin 2024",
    image: "/personnes/passager1.jpg",
    message: "Interface moderne, trajets fiables, suivi GPS précis. Cette application est un vrai atout pour les professionnels comme moi.",
  },
];




function AvisSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
  return (
    <div className="avis-container">
        <h2><span>Ce que les gens</span><strong> pensent de nous</strong></h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={2}
        loop
        className="avis-swiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 }
        }}
      >
            {/* <Slider {...settings}> */}
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="avis-card">
              <div className="avis-stars">★★★★★</div>
              <div className="avis-date">{t.date}</div>
              <p className="avis-message">{t.message}</p>
              <div className="avis-user">
                <img src={t.image} alt={t.name} />
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    {/* </Slider> */}
      </Swiper>
    </div>
  );
}

export default AvisSlider;
