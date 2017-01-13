const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const crimesController  = require('../controllers/crimes');
const lightsController  = require('../controllers/lights');

router.route('/')
  .get(staticsController.home);

router.route('/crimes')
  .get(crimesController.index);
router.route('/lights')
  .get(lightsController.index);

module.exports = router;
