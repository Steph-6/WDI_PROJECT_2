const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const cors       = require('cors');
const rp         = require('request-promise');
const Crime      = require('./models/crime');

const config = require('./config/config');
const routes = require('./config/routes');

mongoose.connect(config.db);

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/', routes);

const url = 'https://data.police.uk/api/crimes-street/all-crime?poly=51.540383,%20-0.094371:51.541741,%20-0.188789:51.486968,%20-0.117030';


app.listen(config.port, () => console.log(`Started on port: ${config.port}`));
