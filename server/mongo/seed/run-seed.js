const data = require('./data/development-data/index');
const seed = require('./seed');
const mongoose = require("mongoose");
require("../connection");

const runSeed = (data) => {
    return seed(data)
    .then(() => {
        mongoose.connection.close();
    })
};

runSeed(data);