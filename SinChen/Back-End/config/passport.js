const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()

const User = require('../models/User');

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["access_token"];
    }
    return token;
  };

// Authorization for Cookie
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err){
            return done(err, false);
        }
        if(user){
            return done(null, user);
        } 
        else {
            return done(null, false);
        }
    });
}));

// Authorization for Login
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        // Database error
        if(err){ 
            return done(err);
        } 
        // User doesn't exist
        if(!user){
            return done(null, false);
        }
        // User found, check password
        user.comparePassword(password, done);
    });
}));