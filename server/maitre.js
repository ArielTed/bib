const axios = require('axios');
const cheerio = require('cheerio');

const getAllUrls = async (links, nbPages) => {
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

module.exports.get = async (restaurants) => {

}