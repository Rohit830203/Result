// models/JobListings.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    listingTitle: {
        type: String,
        required: true,
    },
    applyLink: {
        type: String,
        required: true,
    }
});

const JobListing = mongoose.model('JobListing', jobListingSchema);
module.exports = JobListing;
