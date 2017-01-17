const express = require('express');
const router  = express.Router();

const staticsController = require('../controllers/statics');
const crimesController  = require('../controllers/crimes');
const lightsController  = require('../controllers/lights');
const usersController   = require('../controllers/users');
const authentications = require('../controllers/authentications');

router.route('/')
  .get(staticsController.home);

router.route('/crimes')
  .get(crimesController.index);
router.route('/lights')
  .get(lightsController.index);
router.route('/register')
  .post(authentications.register);
  // .get(usersController.index);
router.route('/login')
  .post(authentications.login);
router.route('/users')
  .get(usersController.index);

module.exports = router;
