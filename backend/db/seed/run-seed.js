const data = require('./data/development/index');
const seed = require('./seed');

const runSeed = (data) => {
    return seed(data)
};

runSeed(data);