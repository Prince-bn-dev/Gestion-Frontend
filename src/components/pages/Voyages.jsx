import React from 'react'

function Voyages() {
    const voyages = [
    {
        id: 1,
        image: "/lieux/abomey.jpg",
        texte: "Voyage vers Abomey-Calavi avec arrêt à Godomey.",
        statut: "disponible",
    },
    {
        id: 2,
        image: "/lieux/porto.jpg",
        texte: "Voyage pour Porto-Novo avec plusieurs arrêts.",
        statut: "terminé",
    },
    {
        id: 3,
        image: "/lieux/ganvie.jpg",
        texte: "Départ pour Ganvier dans la matinée.",
        statut: "annulé",
    },
    {
        id: 4,
        image: "/lieux/ouidah.jpg",
        texte: "Départ pour Parakou dans la matinée.",
        statut: "annulé",
    },
        {
        id: 5,
        image: "/lieux/temple.jpg",
        texte: "Voyage pour Porto-Novo avec plusieurs arrêts.",
        statut: "terminé",
    },
    
    ];


  return (
    <div className='voyages'>
      <h2>Les voyages disponibles</h2>
      <div className='voyages-container'>
        {voyages.map((voyage) => (
          <div className='voyages-item' key={voyage.id}>
            <img src={voyage.image} alt={`Voyage ${voyage.id}`} />
            <section>{voyage.texte}</section>
            <span className={voyage.statut}>
            {voyage.statut.charAt(0).toUpperCase() + voyage.statut.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Voyages