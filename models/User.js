const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: String
 
},{
    timestamps: true
})

// hash the password before saing
UserSchema.pre('save', async function(next){
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// This method compares entered password and hashed password 
UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',UserSchema)
module.exports = User