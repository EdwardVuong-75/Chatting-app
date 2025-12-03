const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({

    receiver:{
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true 
    },

    message: {type: String, require: true}
});

module.exports = mongoose.model('Chat', chatSchema);