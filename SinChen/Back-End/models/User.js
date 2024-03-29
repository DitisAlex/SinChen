const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
})

usersSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }; 
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err){
            return next(err);
        } else {
            this.password = passwordHash;
            next();
        }
    });
});

usersSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err){
            return cb(err);
        } else {
            if(!isMatch){
                return cb(null, isMatch);
            }
            return cb(null, this)
        }
    });
}

module.exports = mongoose.model('User', usersSchema)