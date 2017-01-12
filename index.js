const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const cors     = require('cors');
// const rp       = require('request-promise');

const config = require('./config/config');
const routes = require('./config/routes');
// const apiRouter = require('./config/apiRoutes');
// const webRouter = require('./config/webRoutes');

mongoose.connect(config.db);

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/', routes);

app.listen(config.port, () => console.log(`Started on port: ${config.port}`));
