require('dotenv').config();
const app = require('./app');
// const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
// const dbURL = process.env.MONGODB_URI;
const connectDB = require('./config/db')

// Connect Database
connectDB();

//-----------------
app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
});
