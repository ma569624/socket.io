const mongoose = require('mongoose');

// Define UserList schema
const UsersSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        socketid: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// Create and export UserList model
const Users = mongoose.model('User', UsersSchema);
module.exports = Users;