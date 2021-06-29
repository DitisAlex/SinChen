const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    ordered: [{
        _id: {
            required: false,
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    table: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: String
    }
})

// Sets the created_at parameter equal to the current time
orderSchema.pre('save', function (next) {
    now = new Date();
    hours = now.getHours();
    if(now.getMinutes() < 10){
        const zero  = "0"
        minutes = zero + now.getMinutes()
    } else {
        minutes = now.getMinutes()
    }
    time = hours + ":" + minutes
    if (!this.timestamp) {
        this.timestamp = time
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema)