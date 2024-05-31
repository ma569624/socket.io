const mongoose = require('mongoose');

// Define UserList schema
const userListSchema = new mongoose.Schema(
    { 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        logintime: {}
    },
    {
        timestamps: true,
    }
);

// Create and export UserList model
const UserList = mongoose.model('UserList', userListSchema);
module.exports = UserList;