const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
  category: { type: String },
  lat: { type: String },
  lng: { type: String },
  id: { type: String },
  month: { type: String }
});

module.exports = mongoose.model('Crime', crimeSchema);
