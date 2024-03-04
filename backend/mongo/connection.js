const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path:`${__dirname}/../.env.${ENV}`
})

function connectDB(app) {
    return mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        app.listen(9090, () => {
            console.log('App connected to database. Listening at port 9090');
        })
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = connectDB;