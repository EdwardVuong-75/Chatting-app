const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String

});

    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 8);
        next();
    });

module.exports = mongoose.model('user', userSchema)