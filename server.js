const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const dbURL = process.env.MONGODB_URI;


// Connect Database
mongoose.connect(dbURL, () => { console.log("Connected to DataBase") });

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));



app.listen(port, () => console.log(`Server started on port ${port}`));