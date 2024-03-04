const UserModel = require("../mongo/models/user.model");

function allUsersData() {
    return UserModel.find({}, "name email username")
    .then(allUsers => {
        return allUsers;
    })
}

function userData(username) {
    return UserModel.find({username}, "name email username")
    .then(user => {
        return user[0]
    })
}

module.exports = {allUsersData,
    userData}