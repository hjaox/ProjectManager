const db = require("../db/connection");
const format = require("pg-format");

function authenticateUser(name, password) {
    const queryStr = format("SELECT * FROM users WHERE name = %L", [name]);

    return db
    .query(queryStr)
    .then(({rows}) => {
        if(!rows.length || rows[0]?.password !== password) return Promise.reject({status: 401, msg: "Incorrect email or password"});

        return rows[0];
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

module.exports = { authenticateUser };