const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String
 
})
const User = mongoose.model('User',UserSchema)
module.exports = User