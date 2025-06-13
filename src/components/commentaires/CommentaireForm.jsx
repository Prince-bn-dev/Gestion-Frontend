import React, { useState } from 'react';
import { createCommentaire } from '../../api/commentaireApi';
import { FaStar } from 'react-icons/fa';

function CommentaireForm({ voyageId, userId, onCommentAdded }) {
  const [texte, setTexte] = useState('');
  const [note, setNote] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!texte || !note) return;
    try {
      await createCommentaire({ voyage: voyageId, auteur: userId, texte, note });
      setTexte('');
      setNote(5);
      onCommentAdded(); 
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="commentaire-form">
      <textarea
        className="commentaire-input"
        rows="3"
        placeholder="Laissez un commentaire..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        required
      />
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            onClick={() => setNote(n)}
            className={`star ${n <= note ? 'active' : ''}`}
          />
        ))}
        <span className="note-label">Note : {note}</span>
      </div>
      <button type="submit" className="submit-button">
        Envoyer
      </button>
    </form>
  );
}

export default CommentaireForm;
