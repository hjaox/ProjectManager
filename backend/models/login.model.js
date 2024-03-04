const UserModel = require("../mongo/models/user.model");

function authenticateUser(name, password) {
    return UserModel.find({name, password}, "name username email")
    .then(user => {
        if(!user.length) return Promise.reject({status: 401, msg: "Incorrect email or password"});

        return user;
    })
}

module.exports = { authenticateUser };