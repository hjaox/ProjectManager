const data = require('./data/development/index');
const seed = require('./seed');
const db = require('../connection');

const runSeed = () => {
    return seed(data)
    .then(() => {
        return db.end();
    });
};

runSeed();