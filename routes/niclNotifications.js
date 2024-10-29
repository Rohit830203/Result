// routes/niclNotifications.js
const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new notification
router.post('/', async (req, res) => {
    const { title, recruitmentTitle, examTitle, websiteLink } = req.body;

    const notification = new Notification({
        title,
        recruitmentTitle,
        examTitle,
        websiteLink,
    });

    try {
        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a notification
router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
