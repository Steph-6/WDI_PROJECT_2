const Promise    = require('bluebird');
const mongoose   = require('mongoose');
const chalk      = require('chalk');
mongoose.Promise = Promise;
const config     = require('../config/config');
const data       = require('./data/streetlights').features;
const Light      = require('../models/light');

mongoose.connect(config.db);

Light.collection.drop();

Promise.map(data, (light, i) => {
  console.log(chalk.yellow(`${i}.`));
  return Light
    .create({
      lat: light.properties.LAT,
      lng: light.properties.LONG
    });
}).then(lights => {
  console.log(chalk.green(`${lights.length} have been added!`));
}).catch(err => {
  console.log(chalk.red(`Something went wrong: ${err}`));
});
