const User = require('../models/user');

function usersCreate(req, res){
  const user = new User(req.body.user);
  user.save((err, user) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(user);
  });
}

function usersIndex(req, res){
  User.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(users);
  });
}


module.exports = {
  index: usersIndex,
  create: usersCreate
};
