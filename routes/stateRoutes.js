const express = require('express');
const router = express.Router();
const State = require('../models/State');

// Get all states
router.get('/', async (req, res) => {
    try {
        const states = await State.find();
        if (states.length === 0) {
            return res.status(404).json({ message: 'No states found' });
        }
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new state
router.post('/', async (req, res) => {
    const { stateName, districts } = req.body;

    // Ensure that districts is an array
    if (!Array.isArray(districts)) {
        return res.status(400).json({ message: "Districts must be an array" });
    }

    const state = new State({ stateName, districts });
    try {
        const savedState = await state.save();
        res.status(201).json(savedState);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing state
router.put('/:id', async (req, res) => {
    // Ensure districts is an array if it exists in the request body
    if (req.body.districts && !Array.isArray(req.body.districts)) {
        return res.status(400).json({ message: "Districts must be an array" });
    }

    const updates = {};
    if (req.body.stateName) updates.stateName = req.body.stateName;
    if (req.body.districts) updates.districts = req.body.districts;

    try {
        const updatedState = await State.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(updatedState);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a state
router.delete('/:id', async (req, res) => {
    try {
        const deletedState = await State.findByIdAndDelete(req.params.id);
        if (!deletedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json({ message: 'State deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
