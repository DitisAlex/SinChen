const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    attribute: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema)