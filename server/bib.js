const fs = require('fs');
var stringSimilarity = require('string-similarity');

const contains = (restaurant, bib) => {
  for (element of bib) {
    if (restaurant === element)
      return true;
  }
  return false;
}

module.exports.findBib = async () => {
  const michelinJSON = await fs.readFileSync('server/BibGourmand.json');
  const michelin = JSON.parse(michelinJSON);

  const maitreJSON = await fs.readFileSync('server/MaitreRestaurateur.json');
  const maitre = JSON.parse(maitreJSON);

  let bib = [];
  for (restaurant of maitre) {
    for (restaurant2 of michelin) {
      const nameSimilarity = stringSimilarity.compareTwoStrings(restaurant.nom.toLowerCase().trim().replace(/\s,-'/, ''), restaurant2.nom.toLowerCase().trim().replace(/\s,-'/, ''));
      const adresseSimilarity = stringSimilarity.compareTwoStrings(restaurant.adresse.toLowerCase().trim().replace(/\s,-'/, ''), restaurant2.adresse.toLowerCase().trim().replace(/\s,-'/, ''));
      const telephoneSimilarity = stringSimilarity.compareTwoStrings(restaurant.telephone.substr(1), restaurant2.telephone.substr(4));
      if (nameSimilarity > 0.8 && !contains(restaurant2, bib))
        bib.push(restaurant2);
      else if (telephoneSimilarity > 0.8 && restaurant.telephone !== 'Non renseigné' && restaurant2.telephone !== 'Non renseigné' && !contains(restaurant2, bib))
        bib.push(restaurant2);
      else if (nameSimilarity > 0.6 && adresseSimilarity > 0.6 && !contains(restaurant2, bib))
        bib.push(restaurant2);
    }
  }

  return bib;
}
