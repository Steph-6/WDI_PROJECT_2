const User = require('../models/user');

function usersIndex(req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ users });
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(404).json({ message: 'No user found.' });

    return res.status(200).json(user);
  });
};

module.exports = {
  index: usersIndex,
  show: usersShow
};
