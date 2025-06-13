import React from "react";
import { FaDownload, FaTrash, FaEdit } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ReservationTicket({ reservation, onDelete, onEdit }) {
  const { voyage, nombre_places, statut, date_reservation, paiement } = reservation;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("BILLET DE RESERVATION", 10, 15);
    doc.setFontSize(12);
    doc.text(`Nom du passager : ${reservation.voyageur?.nom}`, 10, 30);
    doc.text(`Prenom du passager : ${reservation.voyageur?.prenom}`, 10, 40);
    doc.text(`Départ : ${voyage?.vehicule?.parc?.localisation || "N/A"}`, 10, 50);
    doc.text(`Destination : ${voyage?.destination || "N/A"}`, 10, 60);
    doc.text(`Date : ${voyage?.date_depart ? new Date(voyage.date_depart).toLocaleDateString() : "N/A"}`, 10, 70);
    doc.text(`Heure de départ : ${voyage?.heure_depart || "N/A"}`, 10, 80);
    doc.text(`Heure d'arrivée estimée : ${voyage?.heure_arrivee_Estime || "N/A"}`, 10, 90);
    doc.text(`Train (immatriculation) : ${voyage?.vehicule?.immatriculation || "N/A"}`, 10, 100);
    doc.text(`Place : A3`, 10, 110); 
    doc.text(`Prix : ${reservation?.paiement.montant || "N/A"} FCFA`, 10, 120);
    doc.text(`Statut : ${statut}`, 10, 120);
    doc.save(`reservation-${reservation._id}.pdf`);
  };

  return (
    <div className="reservation-ticket">
      <div className="ticket-header">
        <span className="ticket-title">BILLET DE RESERVATION</span>
        <span className="ticket-class">AUTO-TRACK</span>
      </div>
      <div className="ticket-body">
        <div className="ticket-row">
          <span className="label">Passager :</span>
          <span className="value">{reservation.voyageur?.nom}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Départ :</span>
          <span className="value">{voyage?.vehicule?.parc?.localisation || "N/A"}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Destination :</span>
          <span className="value">{voyage?.destination || "N/A"}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Date :</span>
          <span className="value">{voyage?.date_depart ? new Date(voyage.date_depart).toLocaleDateString() : "N/A"}</span>
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
          <span className="label">Vehicule (immatriculation) :</span>
          <span className="value">{voyage?.vehicule?.immatriculation || "N/A"}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Prix :</span>
          <span className="value">{reservation?.paiement.montant || "N/A"} FCFA</span>
        </div>
        <div className="ticket-row">
          <span className="label">Nombre de places :</span>
          <span className="value">{nombre_places}</span>
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
