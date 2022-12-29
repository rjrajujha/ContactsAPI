require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const dbURL = process.env.MONGODB_URI;

// Connect Database
mongoose.connect(dbURL, (e) => {
    if (e) {
        console.log("Error to Connect Databse");
    }
    else {
        console.log("Connected to database");
    }
});


//-----------------
app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
});
