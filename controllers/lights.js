const Light = require('../models/light');

function lightsIndex(req, res){
  Light.find((err, lights) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(lights);
  });
}

module.exports = {
  index: lightsIndex
};
