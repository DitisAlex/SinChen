require('dotenv').config()

const port = process.env.SERVER_PORT
const dbUrl = process.env.MONGODB_LOGIN_URL

const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')

// Initialize CORS
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

// Initialize bodyParser
app.use(bodyParser.json());

// Initialize cookieParser
app.use(cookieParser());

// Initialize routes
app.use(express.static(`${__dirname}/../Front-End/build`));
app.use("/api/users", require("./routes/users"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/items", require("./routes/items"))
app.get('*', (req, res)=>{  res.sendFile(path.join(__dirname, '../Front-End/build/index.html'));})

// Initialize port
app.listen(port, () => mongoose.connect(
  dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log(`Database connection established`)
  }
));