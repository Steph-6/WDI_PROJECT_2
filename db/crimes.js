const Promise    = require('bluebird');
const mongoose   = require('mongoose');
const chalk      = require('chalk');
mongoose.Promise = Promise;
const rp         = require('request-promise');
const config     = require('../config/config');
const url        = 'https://data.police.uk/api/crimes-street/all-crime?lat=52.960413&lng=-1.159421';
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
          lng: crime.location.longitude
        });
    });
  })
  .then(crimes => {
    console.log(chalk.green(`${crimes.length} saved!`));
    process.exit();
  })
  .catch(console.log);
