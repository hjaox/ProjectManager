const { sanitizeFilter } = require("mongoose");
const UserModel = require("../mongo/models/user.model");

function allUsersData() {
    return UserModel.find({}, "name email username")
    .then(allUsers => {
        return allUsers;
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

function userData(username) {
    const sanitizedQuery = sanitizeFilter({username});

    return UserModel.find(sanitizedQuery, "name email username")
    .then(user => {
        return user[0]
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

module.exports = {allUsersData,
    userData}