const Crime = require('../models/crime');

function crimesIndex(req, res){
  Crime.find((err, crimes) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ crimes: crimes });
  });
}

module.exports = {
  index: crimesIndex
};
