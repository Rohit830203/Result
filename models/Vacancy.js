// models/Vacancy.js
const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  postName: { type: String, required: true },
  totalPost: { type: Number, required: true },
  eligibility: { type: String, required: true },
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;
