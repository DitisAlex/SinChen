const express = require("express");
const router = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../config/passport');

const User = require("../models/User");

const signToken = userID => {
    return JWT.sign({
        iss: "SinChen",
        sub: userID
    }, "SinChen", { expiresIn: "1h" });
}

//Register user
router.post('/register', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } })
        }
        if (user) {
            res.status(400).json({ message: { msgBody: "User already exists", msgError: true } })
        }
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err) {
                    res.status(404).json({ message: { msgBody: "Account failed to register", msgError: true } })
                } else {
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } })
                }
            });
        };
    });
});

//Login user
router.post('/login', passport.authenticate('local', { session: false }), async function (req, res) {
    if (req.isAuthenticated()) {
        const { _id, username, role, orders } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role, orders } });
    }
});

//Logout user
router.get('/logout', passport.authenticate('jwt', { session: false }), async function (req, res) {
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

//Admin login
router.get('/admin', passport.authenticate('jwt', { session: false }), async function (req, res) {
    if (req.user.role === 'admin') {
        res.status(200).json({ message: { msgBody: "[Authorized] You're an admin", msgError: false } });
    } else {
        res.status(403).json({ message: { msgBody: "[Unauthorized] You're not an admin", msgError: true } });
    }
});

//Check authorization
router.get('/isAuthenticated', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

//Get all users
router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const result = await User.find({}, { username: 1, role: 1 })
    res.status(200).json(result);
});

//Change password
router.put('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.status(404).json({ message: { msgBody: "Error has occured", msgError: true } })
        } if (!user) {
            res.status(404).json({ message: { msgBody: "User doesn't exist", msgError: true } })
        } else {
            user.password = req.body.password;
            user.save(err => {
                if (err) {
                    res.status(404).json({ message: { msgBody: "Password failed to change", msgError: true } })
                } else {
                    res.status(201).json({ message: { msgBody: "Password successfully changed", msgError: false } })
                }
            })
        }
    })
})

//Delete an user
router.delete('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const username = req.body.username
    await User.deleteOne({ username: username })
    res.status(200).json("Deleted user");
})

module.exports = router;