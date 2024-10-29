const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    stateName: { type: String, required: true },
    districts: { type: [String], required: true } // Ensure districts is an array of strings
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
