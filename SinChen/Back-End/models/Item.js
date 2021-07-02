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

// Sets attribute to upperCase
itemSchema.pre('save', function (next) {
    capital = this.attribute.toUpperCase();
    this.attribute = capital
    next();
});


module.exports = mongoose.model('Item', itemSchema)