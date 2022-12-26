require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL, () => { console.log("Connected to DataBase") });

app.listen(port, () => {
  console.log(`Server is up at port ${port}`)
});