const express = require("express");
const router = express.Router();
const passport = require('passport');

const Items = require("../models/Item");

//Return all items
router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const result = await Items.find({})
    res.send(result);
})

//Return all items of type 'Teppan'
router.get('/teppan', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const result = await Items.find({ type: 'Teppan' })
    res.send(result)
})

//Return all items of type 'Grill'
router.get('/grill', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const result = await Items.find({ type: 'Grill' })
    res.send(result);
})

//Delete an item
router.delete('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const item = req.body.item
    await Items.deleteOne({ name: item })
    res.status(200).json("Deleted item");
})

//Add an item
router.put('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    const attribute = req.body.attribute
    const name = req.body.name
    const type = req.body.type

    const results = await Items.find({ name: name, attribute: attribute, type: type }).countDocuments()
    if(results > 0){
        res.status(400).json("Item already exists");
    }
    else {
        await Items.create({ name: name, attribute: attribute, type: type })
        res.status(201).json("Added item");
    }
})

module.exports = router;