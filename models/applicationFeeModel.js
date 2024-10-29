const mongoose = require('mongoose');

const applicationFeeSchema = new mongoose.Schema({
    generalFee: { type: String, required: true },
    scStPhFee: { type: String, required: true },
    additionalInfo: { type: String },
});

// Export the ApplicationFee model
module.exports = mongoose.model('ApplicationFee', applicationFeeSchema);
