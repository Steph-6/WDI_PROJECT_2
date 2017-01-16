const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');
// mongoose.Promise = global.Promise;
const cors       = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/config');
const routes = require('./config/routes');

mongoose.connect(config.db);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);

app.listen(config.port, () => console.log(`Started on port: ${config.port}`));
