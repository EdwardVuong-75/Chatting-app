const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendRequestSchema = new Schema({

    receiver:{
        type: mongoose.Schema.Types.ObjectId, ref: "user" 
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "user" 
    },

    message: String,

    type: String,

    status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending"
    }

});

module.exports = mongoose.model('Notification', friendRequestSchema);