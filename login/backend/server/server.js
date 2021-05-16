const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesURLs = require('../routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require("passport");

const app = express ();

dotenv.config({
 path: path.join(__dirname, "../.env")
});

mongoose.connect(process.env.DATABASE_ACCESS,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }, () =>console.log("Database Connected"));

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);

app.use('/api', routesURLs);
app.listen(4000, () => console.log("server is up and running"));
