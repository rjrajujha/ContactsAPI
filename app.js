const express = require('express');
const app = express();


// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/test', require('./routes/test'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
