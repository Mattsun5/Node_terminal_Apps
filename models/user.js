const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "first_name": {
        type: String, 
        required: true
    },
    "last_name": {
        type: String, 
        required: true
    },
    "email": {
        type: String, 
        required: true,
        unique: true
    },
    "gender": {
        type: String, 
        required: true
    },
    "occupation": String
},
{timestamps: true}
);

const User = mongoose.model('users', userSchema);

module.exports = User;