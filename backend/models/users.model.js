const { sanitizeFilter } = require("mongoose");
const UserModel = require("../mongo/models/user.model");

function allUsersData() {
    return UserModel.find({}, "name email username")
    .then(allUsers => {
        return allUsers;
    })
}

function userData(username) {
    const sanitizedQuery = sanitizeFilter({username});

    return UserModel.find(sanitizedQuery, "name email username")
    .then(user => {
        return user[0]
    })
}

module.exports = {allUsersData,
    userData}