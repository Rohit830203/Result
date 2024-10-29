// models/AdmitCard.js
const mongoose = require('mongoose');

const admitCardSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    applyLink: { type: String, required: true },
});

module.exports = mongoose.model('AdmitCard', admitCardSchema);
