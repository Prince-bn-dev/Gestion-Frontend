import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReservationById, updateReservation } from '../../api/reservationApi';
import { createPaiement } from '../../api/paiementApi';
import { useNavigate, useParams } from 'react-router-dom';
import KkiapayButton from '../../components/KkiapayButton';
import Loader from '../Loader';

function ReservationForm() {
  const { user } = useAuth();
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [taux, setTaux] = useState(25); 

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.log("Vous devez être connecté.");
        return navigate('/login');
      }

      try {
        const resData = await getReservationById(reservationId);
        setReservation(resData);
      } catch (err) {
        console.log("Erreur lors du chargement des données.");
        navigate('/allVoyages');
      }
    };

    fetchData();
  }, [user, reservationId, navigate]);

  const handlePaymentSuccess = async ({ transactionId }) => {
    const montant = Math.round(reservation.voyage.prix_par_place * (taux / 100));

    try {
      await createPaiement({
        reservation: reservation._id,
        montant,
        kkiapay_id: transactionId,
        statut: 'effectue',
      });

      await updateReservation(reservation._id, {
        statut: 'confirmee',
      });

      console.log("Paiement confirmé. Réservation validée !");
      navigate('/mes-reservations');
    } catch (err) {
      console.log(err.response?.data?.message || "Erreur lors du traitement du paiement.");
    }
  };

  if (!reservation) return <p><Loader /></p>;

  const voyage = reservation.voyage;
  const montantTotal = voyage?.prix_par_place || 0;
  const montantApayer = Math.round(montantTotal * (taux / 100));

  return (
    <div className="reservation-form">
      <h2>Paiement de la réservation</h2>

      {voyage ? (
        <>
          <p><strong>Trajet :</strong> {voyage.destination ? `Départ → ${voyage.destination}` : 'Destination inconnue'}</p>
          <p><strong>Date :</strong> {voyage.date_depart ? new Date(voyage.date_depart).toLocaleDateString() : 'Date inconnue'}</p>
          <p><strong>Heure départ :</strong> {voyage.heure_depart || 'Heure inconnue'}</p>
          <p><strong>Montant total :</strong> {montantTotal.toLocaleString()} FCFA</p>

          <div className="choix-taux">
            <p><strong>Choisissez un taux de paiement :</strong></p>
            {[25, 50, 100].map((val) => (
              <label key={val} style={{ marginRight: '1rem' }}>
                <input
                  type="radio"
                  name="taux"
                  value={val}
                  checked={taux === val}
                  onChange={() => setTaux(val)}
                />
                {val}%
              </label>
            ))}
          </div>

          <p><strong>Montant à payer :</strong> {montantApayer.toLocaleString()} FCFA</p>

          <KkiapayButton
            amount={montantApayer}
            user={user}
            onSuccess={handlePaymentSuccess}
          />
        </>
      ) : (
        <p>Détails du voyage non disponibles</p>
      )}
    </div>
  );
}

export default ReservationForm;
