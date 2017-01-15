const Promise    = require('bluebird');
const mongoose   = require('mongoose');
const chalk      = require('chalk');
mongoose.Promise = Promise;
const rp         = require('request-promise');
const config     = require('../config/config');
const url        = 'https://data.police.uk/api/crimes-street/all-crime?poly=52.957699,-1.265336:53.014850,-1.164429:52.954106,-1.096938:52.911270,-1.167319';
//52.957699,-1.265336:52.899570,-1.205941:52.889732,-1.169720:52.954778,-1.069470:53.025560,-1.160193,53.008753,-1.229630  52.931956, -1.160774
//52.957699,-1.265336:53.014850,-1.164429:52.954106,-1.096938:52.911270,-1.167319

const Crime      = require('../models/crime');

mongoose.connect(config.db);

Crime.collection.drop();

rp(url)
  .then(htmlString => {
    const json = JSON.parse(htmlString);
    return Promise.map(json, (crime, i) => {
      console.log(chalk.yellow(`${i}`));
      return Crime
        .create({
          lat: crime.location.latitude,
          lng: crime.location.longitude,
          category: crime.category,
          month: crime.month
        });
    });
  })
  .then(crimes => {
    console.log(chalk.green(`${crimes.length} saved!`));
    process.exit();
  })
  .catch(console.log);
