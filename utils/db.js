const { default: mongoose } = require("mongoose")
const uri = "mongodb://localhost:27017/chat";

module.exports = async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};