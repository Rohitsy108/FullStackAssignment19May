const axios = require('axios');
const cheerio = require('cheerio');
const Event = require('../models/Event');

const scrapeSydneyEvents = async () => {
  const url = 'https://example.com/events'; // replace with a real site
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  
  $('.event-card').each(async (i, el) => {
    const title = $(el).find('.title').text();
    const date = $(el).find('.date').text();
    const location = $(el).find('.location').text();
    const description = $(el).find('.desc').text();
    const image = $(el).find('img').attr('src');
    const link = $(el).find('a').attr('href');

    const newEvent = new Event({ title, date, location, description, image, link });
    await newEvent.save();
  });

  console.log('Events scraped and saved');
};

module.exports = scrapeSydneyEvents;
