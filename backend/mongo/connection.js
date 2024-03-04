const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path:`${__dirname}/../.env.${ENV}`
})

const db = mongoose
.connect(process.env.mongoDBURL)
.catch(err => {
    console.log(err, "Error connecting to database");
})

module.exports = db;