const db = require('../db/connection');
const format = require('pg-format');

function allUsersData() {
    return db
    .query(`SELECT * FROM users`)
    .then(({rows}) => {
        return rows;
    })

}

function userData(username, password) {
    const userDataQueryStr = format(
        `SELECT * FROM users WHERE username = %L`, [username]
    );

    return db
    .query(userDataQueryStr)
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({status: 400, msg: "Not Found"});
        if(rows[0].password !== password) return Promise.reject({status: 400, msg: "Incorrect Username or Password"});

        return rows[0];
    })
}

module.exports = {allUsersData,
    userData}