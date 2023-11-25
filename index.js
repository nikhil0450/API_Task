const express = require('express');
const mongoose = require('mongoose');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assignRoutes = require('./routes/assignRoutes');
const connectDB = require('./db'); 
const dotenv = require('dotenv');
dotenv.configDotenv();

const app = express();
const port = process.env.PORT ;

app.use(express.json());

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);
app.use('/assign', assignRoutes);

// Connect to MongoDB
connectDB();

app.listen(port, process.env.HOSTNAME, () => {
    console.log(`Server is running on port ${port}`);
  });
