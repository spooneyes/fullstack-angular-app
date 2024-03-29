const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, default: null},
    last_name: { type: String, required: true, default: null},
    email: { type: String, unique: true, required: true, default: null},
    password: { type: String, required: true},
    token: { type: String },
})

module.exports = mongoose.model('user', userSchema, 'users');