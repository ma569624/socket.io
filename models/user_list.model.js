const mongoose = require('mongoose');

// Define UserList schema
const userListSchema = new mongoose.Schema(
    { 
        name: {
           type: String,
        },
        email: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export UserList model
const UserList = mongoose.model('UserList', userListSchema);
module.exports = UserList;