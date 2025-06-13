import React, { useEffect, useState } from 'react';
import { getCommentairesByVoyage, deleteCommentaire } from '../../api/commentaireApi';
import { FaStar, FaTrash } from 'react-icons/fa';

function CommentairesSection({ voyageId, user }) {
  const [commentaires, setCommentaires] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  const fetchCommentaires = async () => {
    try {
      const res = await getCommentairesByVoyage(voyageId);
      setCommentaires(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires', err);
    }
  };

  useEffect(() => {
    fetchCommentaires();
  }, [voyageId]);

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce commentaire ?')) {
      await deleteCommentaire(id);
      fetchCommentaires();
    }
  };

  const handleVoirPlus = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const commentairesVisibles = commentaires.slice(0, visibleCount);

  return (
    <div className="commentaires-section">
      <h3 className="titre-section">Commentaires</h3>
      {commentaires.length === 0 ? (
        <p className="aucun">Aucun commentaire pour ce voyage.</p>
      ) : (
        <>
          <div className="liste-commentaires">
            {commentairesVisibles.map((com) => (
              <div key={com._id} className="commentaire">
                <div className="commentaire-entete">
                  <img
                    src={
                      com.auteur?.image
                        ? `${import.meta.env.VITE_API_URL}${com.auteur.image}`
                        : '/default-avatar.png'
                    }
                    alt="avatar"
                    className="avatar-commentaire"
                  />
                  <div className="infos">
                    <div className="auteur">
                      {com.auteur?.nom || com.auteur?.prenom || 'Utilisateur'}
                    </div>
                    <div className="etoiles">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < com.note ? 'active' : ''}
                        />
                      ))}
                    </div>
                  </div>
                  {user?._id === com.auteur?._id && (
                    <button
                      onClick={() => handleDelete(com._id)}
                      className="supprimer"
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <div className="texte">{com.texte}</div>
              </div>
            ))}
          </div>

          {visibleCount < commentaires.length && (
            <button onClick={handleVoirPlus} className="voir-plus">
              Voir plus de commentaires
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default CommentairesSection;
