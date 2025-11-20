const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: String
})

module.exports = mongoose.model('user', userSchema)