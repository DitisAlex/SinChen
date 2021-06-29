const mongoose = require('mongoose');

require('dotenv').config()

require('../models/User')
const Users = mongoose.model('User')

const dbUrl = process.env.MONGODB_LOGIN_URL

const seedUser =     {
    username: "user",
    password: "user",
    role: "user"
}

const seedAdmin =     {
    username: "admin",
    password: "admin",
    role: "admin"
}

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
    await Users.deleteMany();
    const admin = new Users(seedAdmin);
    admin.save();

    const user = new Users(seedUser);
    user.save();
}