const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const crimesController  = require('../controllers/crimes');
const lightsController  = require('../controllers/lights');
const usersController   = require('../controllers/users');
const authenticationsController = require('../controllers/authentications');

router.route('/')
  .get(staticsController.home);

router.route('/crimes')
  .get(crimesController.index);
router.route('/lights')
  .get(lightsController.index);
router.route('/register')
  .post(authenticationsController.register)
  .get(usersController.index);
router.route('/login')
  .post(authenticationsController.login);

module.exports = router;
