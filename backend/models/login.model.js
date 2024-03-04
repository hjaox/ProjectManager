const { sanitizeFilter } = require("mongoose");
const UserModel = require("../mongo/models/user.model");

function authenticateUser(name, password) {
    const formatQuery = sanitizeFilter({name, password});

    return UserModel.find(formatQuery, "name username email")
    .then(user => {
        if(!user.length) return Promise.reject({status: 401, msg: "Incorrect email or password"});

        return user[0];
    })
}

module.exports = { authenticateUser };