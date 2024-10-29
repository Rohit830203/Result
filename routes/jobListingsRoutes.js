// routes/jobListingsRoutes.js
const express = require('express');
const JobListing = require('../models/JobListings');

const router = express.Router();

// Get all job listings
router.get('/', async (req, res) => {
    try {
        const listings = await JobListing.find();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new job listing
router.post('/', async (req, res) => {
    const { listingTitle, applyLink } = req.body;

    const newListing = new JobListing({ listingTitle, applyLink });

    try {
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: 'Error saving listing' });
    }
});

// Delete a job listing
router.delete('/:id', async (req, res) => {
    try {
        const deletedListing = await JobListing.findByIdAndDelete(req.params.id);
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json({ message: 'Listing deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
