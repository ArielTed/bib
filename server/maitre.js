const axios = require('axios');
const cheerio = require('cheerio');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse webpage restaurant
 * @param  {Array} links - array of link for each restaurant
 * @param  {Array} restaurants - array of object restaurant
 */
const parse = async (link, restaurants) => {
  console.log(`🕵️‍♀️  browsing ${link}`);
  const response = await axios(link);
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data);
    const nom = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > span:nth-child(1) > strong').text();
    const adresse = $('#adresse_pro_1_map').text().trim().replace(/\s+\n+/g, '') + ' France';
    let telephone;
    if ($('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5').text().replace(/\s/, '').match(/(?:\+33\s|0)[1-9](?:\s\d{2}){4}/g) !== null)
      telephone = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5').text().replace(/\s/, '').match(/(?:\+33\s|0)[1-9](?:\s\d{2}){4}/g)[0];
    else telephone = 'Non renseigné';
    const restaurant = {
      nom: nom,
      adresse: adresse,
      telephone: telephone
    };
    restaurants.push(restaurant);
  }
  else console.error(status);
}

/**
 * Get the url of all the restaurants on the website
 * @param  {Array} links - array of link for each restaurant
 * @param  {Number} nbPages - number of pages of results
 */
const getAllUrls = async (links, nbPages) => {
  console.log("Getting all restaurants urls...")
  let postRequests = [];
  for (let i = 1; i <= nbPages; i++) {
    postRequests.push({
      method: 'post',
      url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: `page=${i}&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard`
    })
  }
  let size = 50;
  let arrayOfArrays = [];
  for (let i = 0; i < postRequests.length; i += size) {
    arrayOfArrays.push(postRequests.slice(i, i + size));
  }
  for (array of arrayOfArrays) {
    await Promise.all(array.map(async request => {
      const response = await axios(request);
      const { data, status } = response;

      if (status >= 200 && status < 300) {
        const $ = cheerio.load(data);
        $('.single_libel a').each((index, value) => {
          let link = $(value).attr('href');
          links.push(`https://www.maitresrestaurateurs.fr${link}`);
        });
      }
      else console.error(status);
    }));
    await sleep(2000);
  }
}

/**
 * Get all France located Bib Gourmand restaurants
 * @param {Array} restaurants - array of all the restaurants
 */
module.exports.get = async (restaurants) => {
  const response = await axios({
    method: 'post',
    url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: 'page=1&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard'
  });
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data);
    const totalRestaurants = $("#topbar_nb_persons")
      .text()
      .trim()
      .split(" ");
    const nbPages = Math.ceil(Number(totalRestaurants[0]) / 10);
    let links = [];
    await getAllUrls(links, nbPages);
    let size = 150;
    let arrayOfArrays = [];
    for (let i = 0; i < links.length; i += size) {
      arrayOfArrays.push(links.slice(i, i + size));
    }
    for (array of arrayOfArrays) {
      await Promise.all(array.map(link => parse(link, restaurants)));
      await sleep(2000);
    }
  }
  else console.error(status);
};
