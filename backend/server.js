const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { connection } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// MongoDB connection


app.listen(PORT, async() => {
    try {
        await connection;
        console.log(`connected to MongoDB atlas`)
    } catch (error) {
        console.log(error)
    }
  console.log(`Server running on port ${PORT}`);
});