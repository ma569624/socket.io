const mongoose = require('mongoose');

// Define UserList schema
const UsersSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

// Create and export UserList model
const Users = mongoose.model('User', UsersSchema);
module.exports = Users;