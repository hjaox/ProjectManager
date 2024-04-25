const { sanitizeFilter } = require("mongoose");
const UserModel = require("../mongo/models/user.model");

function allUsersData() {
    return UserModel.find({}, "name email")
    .then(allUsers => {
        return allUsers;
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

function userData(name) {
    const sanitizedQuery = sanitizeFilter({name});

    return UserModel.find(sanitizedQuery, "name email")
    .then(user => {
        if(!user.length) return Promise.reject({status: 404, msg: "User not found"});

        return user[0]
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

module.exports = {allUsersData,
    userData}