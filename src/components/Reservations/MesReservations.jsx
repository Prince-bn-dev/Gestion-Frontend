import React, { useEffect, useState } from "react";
import { getReservationsByVoyageur, deleteReservation } from "../../api/reservationApi";
import { useAuth } from "../../context/AuthContext";
import ReservationTicket from "./ReservationTicket";
import Loader from "../Loader";

function MesReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await getReservationsByVoyageur(user._id);
      setReservations(res);
      setMessage("");
    } catch (err) {
      setReservations([]);
      setMessage("Erreur lors du chargement des réservations.");
    }
  };

  useEffect(() => {
    if (user && user._id) fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette réservation ?")) {
      try {
        await deleteReservation(id);
        fetchData();
      } catch (err) {
        setMessage("Erreur lors de la suppression.");
      }
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/reservations/edit/${id}`;
  };

  if (!user) return <p><Loader /></p>;

  return (
    <div className="mes-reservations">
      <h2>Mes réservations</h2>
      {message && <p className="error">{message}</p>}
      {reservations.length === 0 ? (
        <p>Aucune réservation.</p>
      ) : (
        <div className="tickets-list">
          {reservations.map((r) => (
            <ReservationTicket
              key={r._id}
              reservation={r}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MesReservations;
