const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const jobsRouter = require('./routes/jobs');
const postsRouter = require('./routes/posts');
const niclNotificationsRouter = require('./routes/niclNotifications');
const importantDatesRouter = require('./routes/dateRoutes');
const applicationFeeRouter = require('./routes/applicationFeeRoutes');
const ndaNotificationsRouter = require('./routes/ndaNotification');
const vacanciesRouter = require('./routes/vacancy');
const stateRouter = require('./routes/stateRoutes'); // Import the state routes
const linkRouter = require('./routes/linkRoutes');
const jobListingsRoutesRouter = require('./routes/jobListingsRoutes'); // Import the job listings routes
const admitCardRoutes = require('./routes/admitCardRoutes'); // Import the admit card routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://rohitkumawat9587:1234@rohit.b5cke.mongodb.net/RohitResult', { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the connectDB function to initiate the connection
connectDB();

// Route setup
app.use('/api/jobs', jobsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/nicl-notifications', niclNotificationsRouter);
app.use('/api/important-dates', importantDatesRouter);
app.use('/api/application-fee', applicationFeeRouter);
app.use('/api/nda-notifications', ndaNotificationsRouter);
app.use('/api/vacancies', vacanciesRouter);
app.use('/api/states', stateRouter); // Use the states router
app.use('/api/links', linkRouter); // Use the Link router
app.use('/api/jobListings', jobListingsRoutesRouter); // Use the job listings router
app.use('/api/admitCardRoutes', admitCardRoutes); // Use the admit card routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
