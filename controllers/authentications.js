const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

function authenticationsRegister(req, res){
  User.create(req.body.user, (err, user) => {
    if (err) res.status(500).json({ message: 'Can\'t register user.' });
    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: 60*60*24 });
    return res.status(201).json({
      message: `Welcome ${user.firstName}!`,
      user,
      token
    });
  });
}

function authenticationsLogin(req, res){
  User.findOne({ email: req.body.user.email }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Can\'t log you in.' });
    if (!user || !user.validatePassword(req.body.user.password)) {
      return res.status(401).json({ message: 'Wrong password.' });
    }
    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: 60*60*24 });
    return res.status(200).json({
      message: 'You\'ve logged in.',
      user,
      token
    });
  });
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
