const axios = require('axios');
const cheerio = require('cheerio');

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
    const nom = $('.section-main h2.restaurant-details__heading--title').text();
    let adresse;
    let telephone_child = 4;
    if ($('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text().trim().replace(/\s\n/g, '').substr(2) === 'Offre' || $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text().trim().replace(/\s\n/g, '').substr(2) === 'Offres') {
      adresse = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(2)').text();
      telephone_child = 5;
    }
    else adresse = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
    const fourchette_type = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().trim().replace(/\s/g, '').split("•");
    const prix = fourchette_type[0];
    const type = "Cuisine " + fourchette_type[1].substr(7);
    const experience_array = $('#experience-section > ul > li:nth-child(2)').text().trim().split(' ');
    const experience = experience_array[experience_array.length - 2] + ' ' + experience_array[experience_array.length - 1];
    const distinction = 'Bib Gourmand';
    let telephone;
    if ($(`body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(${telephone_child}) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a`).length > 0)
      telephone = $(`body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(${telephone_child}) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a`).attr('href').substr(4);
    else telephone = 'Non renseigné';
    const restaurant = {
      nom: nom,
      adresse: adresse,
      telephone: telephone,
      prix: prix,
      type: type,
      experience: experience,
      distinction: distinction
    };
    restaurants.push(restaurant);
  }
  else console.error(status);
};

/**
 * Get the url of all the restaurants on the website
 * @param  {Array} links - array of link for each restaurant
 * @param  {Number} nbPages - number of pages of results
 */
const getAllUrls = async (links, nbPages) => {
  console.log("Getting all restaurants urls...")
  const url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  for (let i = 1; i <= nbPages; i++) {
    const response = await axios(`${url}${i}`);
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      const $ = cheerio.load(data);
      $('.link').each((index, value) => {
        let link = $(value).attr('href');
        links.push(`https://guide.michelin.com${link}`);
      });
    }
    else console.error(status);
  }
}

/**
 * Get all France located Bib Gourmand restaurants
 * @param {Array} restaurants - array of all the restaurants
 */
module.exports.get = async (restaurants) => {
  const url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand";
  const response = await axios(url);
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data);
    const totalRestaurants = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1")
      .text()
      .trim()
      .split(" ");
    const nbPages = Math.ceil(Number(totalRestaurants[totalRestaurants.length - 2]) / 20);
    let links = [];
    await getAllUrls(links, nbPages);
    await Promise.all(links.map(link => parse(link, restaurants)));
  }
  else console.error(status);
};
