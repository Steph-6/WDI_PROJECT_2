const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const crimesController  = require('../controllers/crimes');

router.route('/')
  .get(staticsController.home);

router.route('/crimes')
  .get(crimesController.index);

module.exports = router;
