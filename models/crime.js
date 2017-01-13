const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
  category: { type: String },
  lat: { type: String, trim: true, required: true },
  lng: { type: String, trim: true, required: true },
  id: { type: String },
  month: { type: String }
});

module.exports = mongoose.model('Crime', crimeSchema);
