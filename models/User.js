const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', UserSchema);

