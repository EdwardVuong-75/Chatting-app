const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendRequestSchema = new Schema({

    receiver:{
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    },

    message: String,

    type: String

});

module.exports = mongoose.model('Notification', friendRequestSchema);