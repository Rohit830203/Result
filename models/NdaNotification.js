// NdaNotification.js

const mongoose = require('mongoose');

// Define the NDA Notification schema
const NdaNotificationSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the notification
    startDate: { type: Date, required: true }, // Start date of the notification
    endDate: { type: Date, required: true }, // End date of the notification
    ageRelaxation: { type: String, default: "N/A" }, // Optional age relaxation field
});

// Export the model based on the schema
module.exports = mongoose.model('NdaNotification', NdaNotificationSchema);
