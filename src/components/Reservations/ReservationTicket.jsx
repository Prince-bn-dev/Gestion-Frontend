import React from "react";
import { FaDownload, FaTrash, FaEdit } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ReservationTicket({ reservation, onDelete, onEdit }) {
  const { voyage, nombre_places, statut, paiement } = reservation;
  const voyageur = reservation.voyageur;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("BILLET DE RÉSERVATION", 10, 15);

    doc.setFontSize(12);
    doc.text(`Nom du passager : ${voyageur?.nom || "N/A"}`, 10, 30);
    doc.text(`Prénom du passager : ${voyageur?.prenom || "N/A"}`, 10, 40);
    doc.text(`Départ : ${voyage?.trajet?.lieux_depart || "N/A"}`, 10, 50);
    doc.text(`Destination : ${voyage?.trajet?.lieux_arrive || "N/A"}`, 10, 60);
    doc.text(`Date : ${voyage?.date_depart ? new Date(voyage.date_depart).toLocaleDateString() : "N/A"}`, 10, 70);
    doc.text(`Heure de départ : ${voyage?.heure_depart || "N/A"}`, 10, 80);
    doc.text(`Heure d'arrivée estimée : ${voyage?.heure_arrivee_Estime || "N/A"}`, 10, 90);
    doc.text(`Véhicule (immatriculation) : ${voyage?.vehicule?.immatriculation || "N/A"}`, 10, 100);
    doc.text(`Nombre de places : ${nombre_places}`, 10, 110);
    doc.text(`Prix payé : ${paiement?.montant || "N/A"} FCFA`, 10, 120);
    doc.text(`Statut : ${statut || "N/A"}`, 10, 130);

    doc.save(`reservation-${reservation._id}.pdf`);
  };

  return (
    <div className="reservation-ticket">
      <div className="ticket-header">
        <span className="ticket-title">BILLET DE RÉSERVATION</span>
        <span className="ticket-class">AUTO-TRACK</span>
      </div>
      <div className="ticket-body">
        <div className="ticket-row">
          <span className="label">Passager :</span>
          <span className="value">{voyageur?.prenom} {voyageur?.nom}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Départ :</span>
          <span className="value">{voyage?.trajet?.lieux_depart || "N/A"}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Destination :</span>
          <span className="value">{voyage?.trajet?.lieux_arrive || "N/A"}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Date :</span>
          <span className="value">
            {voyage?.date_depart ? new Date(voyage.date_depart).toLocaleDateString() : "N/A"}
          </span>
        </div>

        <div className="ticket-row">
          <span className="label">Heure départ :</span>
          <span className="value">{voyage?.heure_depart || "N/A"}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Heure arrivée estimée :</span>
          <span className="value">{voyage?.heure_arrivee_Estime || "N/A"}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Véhicule :</span>
          <span className="value">{voyage?.vehicule?.immatriculation || "N/A"}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Nombre de places :</span>
          <span className="value">{nombre_places}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Prix :</span>
          <span className="value">{paiement?.montant || "N/A"} FCFA</span>
        </div>

        <div className="ticket-row">
          <span className="label">Statut :</span>
          <span className={`value ${statut}`}>{statut}</span>
        </div>

        <div className="ticket-actions">
          <button onClick={handleDownloadPDF} title="Télécharger le billet">
            <FaDownload /> PDF
          </button>
          <button onClick={() => onEdit(reservation._id)} title="Modifier la réservation">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(reservation._id)} title="Supprimer la réservation">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationTicket;
