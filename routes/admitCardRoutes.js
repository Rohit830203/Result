const express = require('express');
const router = express.Router();
const AdmitCard = require('../models/AdmitCard'); // Adjust the path as necessary

// POST route to create a new admit card
router.post('/', async (req, res) => {
    const { jobTitle, applyLink } = req.body;

    const newAdmitCard = new AdmitCard({
        jobTitle,
        applyLink,
    });

    try {
        await newAdmitCard.save();
        res.status(201).json({ message: 'Admit card created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving admit card', error });
    }
});

// GET route to fetch all admit cards
router.get('/', async (req, res) => {
    try {
        const admitCards = await AdmitCard.find();
        res.json(admitCards);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching admit cards', error: err });
    }
});

// PUT route to update an admit card
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the id from the request parameters
    const { jobTitle, applyLink } = req.body; // Get the updated data from the request body

    try {
        const updatedAdmitCard = await AdmitCard.findByIdAndUpdate(
            id,
            { jobTitle, applyLink },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedAdmitCard) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json({ message: 'Admit card updated successfully', updatedAdmitCard });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admit card', error });
    }
});

// DELETE route to delete an admit card
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the id from the request parameters

    try {
        const deletedAdmitCard = await AdmitCard.findByIdAndDelete(id);

        if (!deletedAdmitCard) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json({ message: 'Admit card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admit card', error });
    }
});

module.exports = router;
