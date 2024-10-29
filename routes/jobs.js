const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Create a new job
router.post('/', async (req, res) => {
    const { jobTitle, salaryRange, applyLink } = req.body;

    if (!jobTitle || !salaryRange || !applyLink) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const job = new Job({ jobTitle, salaryRange, applyLink });
    try {
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a job
router.delete('/:id', async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
