const Crime = require('../models/crime');

function crimesIndex(req, res){
  Crime.find((err, crimes) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(crimes);
  });
}

module.exports = {
  index: crimesIndex
};
