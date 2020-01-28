/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const michelin = require('./michelin');
const maitre = require('./maitre');

const sandbox = async () => {
  try {
    /*console.log('🕵️‍♀️  browsing https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/');
    let restaurants = [];
    await michelin.get(restaurants);
    const json = await JSON.stringify(restaurants, null, 2);
    fs.writeFileSync('server/BibGourmand.json', json);*/

    console.log('🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr/annuaire/recherche');
    let restaurants2 = [];
    await maitre.get(restaurants2);
    const json2 = await JSON.stringify(restaurants2, null, 2);
    fs.writeFileSync('server/MaitreRestaurateur.json', json2);

    process.exit(0);
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox();
