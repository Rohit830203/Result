const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true }, // Keep only the URL field
});

module.exports = mongoose.model('Link', linkSchema);
