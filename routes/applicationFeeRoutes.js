// routes/applicationFeeRoutes.js
const express = require('express');
const ApplicationFee = require('../models/applicationFeeModel'); // Adjust the path as necessary
const router = express.Router();

// POST route for submitting application fee data
router.post('/', async (req, res) => {
    const { generalFee, scStPhFee, additionalInfo } = req.body;

    try {
        const newApplicationFee = new ApplicationFee({ generalFee, scStPhFee, additionalInfo });
        await newApplicationFee.save();
        res.status(201).json({ message: 'Application fee data submitted successfully!' });
    } catch (error) {
        console.error('Error saving application fee data:', error);
        res.status(500).json({ message: 'Failed to submit application fee data' });
    }
});

// GET route for fetching application fee data
router.get('/', async (req, res) => {
    try {
        const applicationFeeData = await ApplicationFee.findOne(); // Adjust if you need to fetch multiple
        res.status(200).json(applicationFeeData);
    } catch (error) {
        console.error('Error fetching application fee data:', error);
        res.status(500).json({ message: 'Failed to fetch application fee data' });
    }
});

// PUT route for updating application fee data
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const { generalFee, scStPhFee, additionalInfo } = req.body;

    try {
        const updatedApplicationFee = await ApplicationFee.findByIdAndUpdate(id, { generalFee, scStPhFee, additionalInfo }, { new: true });
        if (!updatedApplicationFee) {
            return res.status(404).json({ message: 'Application fee data not found' });
        }
        res.status(200).json({ message: 'Application fee data updated successfully!', data: updatedApplicationFee });
    } catch (error) {
        console.error('Error updating application fee data:', error);
        res.status(500).json({ message: 'Failed to update application fee data' });
    }
});

// DELETE route for deleting application fee data
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const deletedApplicationFee = await ApplicationFee.findByIdAndDelete(id);
        if (!deletedApplicationFee) {
            return res.status(404).json({ message: 'Application fee data not found' });
        }
        res.status(200).json({ message: 'Application fee data deleted successfully!' });
    } catch (error) {
        console.error('Error deleting application fee data:', error);
        res.status(500).json({ message: 'Failed to delete application fee data' });
    }
});

module.exports = router;
