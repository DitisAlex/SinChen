const express = require("express");
const router = express.Router();
const passport = require('passport');

const Order = require("../models/Order");
const User = require("../models/User");

//Post new order
router.post('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const order = new Order(req.body);
    order.save(err => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        } else {
            req.user.orders.push(order);
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(200).json({ message: { msgBody: "Successfully created order", msgError: false } });
            });
        }
    })
});

//Get all orders of today
router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const result = await Order.find({ created_at: { $gte: start } }).sort({created_at:-1})
    res.status(200).json(result);
});

//Filter on orders
router.post('/find', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const query = { created_at: { $gte: start } }

    function formatArray(input) {
        return decodeURI(input).split(',')
    }

    if ((!req.body.table && !req.body.user) || (req.body.table === '' && req.body.user === '')) {
        res.status(404).json({ message: { msgBody: "No filters applied", msgError: true } });
    }
    if (req.body.user && req.body.user !== '') {
        query.user = { $in: formatArray(req.body.user) }
    }
    if (req.body.table && req.body.table !=='') {
        query.table = { $in: formatArray(req.body.table) }
    }
    const result = await Order.find(query).sort({created_at:-1})
    if (result.length === 0) {
        res.status(404).json({ message: { msgBody: "No results found", msgError: true } });
    } else {
        res.status(200).json(result);
    }
});

module.exports = router;