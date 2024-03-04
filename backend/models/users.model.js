const format = require('pg-format');
const UserModel = require("../mongo/models/user.model");

function allUsersData() {
    return UserModel.find({}, "name email username")
    .then(allUsers => {
        return allUsers;
    })
}

function userData(username) {
    const userDataQueryStr = format(
        `SELECT * FROM users WHERE username = %L`, [username]
    );

    return db
    .query(userDataQueryStr)
    .then(({rows}) => {
        if(!rows.length) return Promise.reject({status: 400, msg: "Not Found"});

        return rows[0];
    })
}

module.exports = {allUsersData,
    userData}