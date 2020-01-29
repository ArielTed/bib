/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const michelin = require('./michelin');
const maitre = require('./maitre');
const bib = require('./bib');

const sandbox = async () => {
  try {
    /*console.log('🕵️‍♀️  browsing https://guide.michelin.com');
    const restaurants = await michelin.get();
    const json = await JSON.stringify(restaurants, null, 2);
    fs.writeFileSync('server/BibGourmand.json', json);

    console.log('');*/

    console.log('🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr');
    const restaurants2 = await maitre.get();
    const json2 = await JSON.stringify(restaurants2, null, 2);
    fs.writeFileSync('server/MaitreRestaurateur.json', json2);

    console.log('');

    console.log('Finding all the Maitre Restaurateur restaurants with Bib Gourmand distinction...');
    const listMaitreBib = await bib.findBib();
    const json3 = await JSON.stringify(listMaitreBib, null, 2);
    fs.writeFileSync('server/ListMaitreBib.json', json3);

    console.log('\nDone. Find the results in ListMaitreBib.json');
    process.exit(0);
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox();
