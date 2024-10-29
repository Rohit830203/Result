const express = require('express');
const router = express.Router();
const NDA = require('../models/NdaNotification');

// POST: Create a new NDA notification
router.post('/', async (req, res) => {
    try {
        const newNotification = new NDA(req.body); // Directly pass the req.body object
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Fetch all NDA notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await NDA.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update an existing NDA notification
router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await NDA.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete an NDA notification
router.delete('/:id', async (req, res) => {
    try {
        await NDA.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
