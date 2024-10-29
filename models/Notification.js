// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true }, // NICL Title
    recruitmentTitle: { type: String, required: true }, // Recruitment Title
    examTitle: { type: String, required: true }, // Exam Title
    websiteLink: { type: String, required: true }, // Website Link
});

const Notification = mongoose.model('NICLNotification', notificationSchema);

module.exports = Notification;
    