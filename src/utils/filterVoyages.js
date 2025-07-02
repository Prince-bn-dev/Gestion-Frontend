/**
 * Filtre la liste des voyages selon un terme de recherche.
 * Le filtre s'applique sur : destination, marque véhicule, immatriculation véhicule.
 * 
 * @param {Array} voyages - Liste des voyages
 * @param {string} searchTerm - Terme de recherche
 * @returns {Array} - Voyages filtrés
 */
export function filterVoyages(voyages, searchTerm) {
  if (!searchTerm) return voyages;

  const lowerSearch = searchTerm.toLowerCase();

  return voyages.filter(v => {
    // protections contre valeurs manquantes
    const destination = v.destination?.toLowerCase() || '';
    const marque = v.vehicule?.marque?.toLowerCase() || '';
    const immat = v.vehicule?.immatriculation?.toLowerCase() || '';

    return (
      destination.includes(lowerSearch) ||
      marque.includes(lowerSearch) ||
      immat.includes(lowerSearch)
    );
  });
}
