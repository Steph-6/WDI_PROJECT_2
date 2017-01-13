const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  lat: { type: String, trim: true, required: true },
  lng: { type: String, trim: true, required: true }
});

module.exports = mongoose.model('Light', lightSchema);
