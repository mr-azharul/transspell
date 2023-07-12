const mongoose = require("mongoose");
const DB = require("../../config/database");

const User = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["active", "inactive", "block"],
        default: "inactive"
    }
}, { timestamps: true });

module.exports = DB.model('User', User, 'users');