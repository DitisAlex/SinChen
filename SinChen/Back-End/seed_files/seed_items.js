const mongoose = require('mongoose');

require('dotenv').config()

require('../models/Item')
const Items = mongoose.model('Item')

const dbUrl = process.env.MONGODB_LOGIN_URL

const seedData = [
    {
        name: "Ossenhaas",
        type: "Teppan",
        attribute: "1"
    },
    {
        name: "Lamskotelet",
        type: "Teppan",
        attribute: "2"
    },
    {
        name: "Kipsate",
        type: "Teppan",
        attribute: "3"
    },
    {
        name: "Speklap",
        type: "Teppan",
        attribute: "4"
    },
    {
        name: "Zalm",
        type: "Teppan",
        attribute: "5"
    },
    {
        name: "Pangafilet",
        type: "Teppan",
        attribute: "6"
    },
    {
        name: "Sliptong",
        type: "Teppan",
        attribute: "7"
    },
    {
        name: "Gamba's",
        type: "Teppan",
        attribute: "9"
    },
    {
        name: "Garnalenspies",
        type: "Grill",
        attribute: "A"
    },
    {
        name: "Beef Teriyaki",
        type: "Grill",
        attribute: "B"
    },
    {
        name: "Klassieke Steak (Peper)",
        type: "Grill",
        attribute: "C"
    },
    {
        name: "Klassieke Steak (Champignon)",
        type: "Grill",
        attribute: "C"
    },
    {
        name: "Ribeye",
        type: "Grill",
        attribute: "D"
    },
    {
        name: "Spareribs",
        type: "Grill",
        attribute: "E"
    },
    {
        name: "Malse Kip",
        type: "Grill",
        attribute: "F"
    },
    {
        name: "Irish Burger",
        type: "Grill",
        attribute: "G"
    }
]

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return seedDB();
    }).catch(err => {
        console.log(err)
    }).then(() => {
        console.log(`Succesfully seeded database: ${dbUrl}`)
        mongoose.connection.close
    })

async function seedDB() {
    await Items.deleteMany();
    await Items.insertMany(seedData)
}