const { sanitizeFilter } = require("mongoose");
const UserModel = require("../mongo/models/user.model");

function insertUser(name, email, password) {
    const formatQuery = sanitizeFilter({name, email, password});

    return UserModel.create(formatQuery)
    .then(newUser => {
        return newUser;
    })
    .catch(err => {
        return Promise.reject(err);
    })
}

function checkCredentials(name, email) {
    const formatNameQuery = sanitizeFilter({name});
    const formatEmailQuery = sanitizeFilter({email});

    return Promise.all([UserModel.find(formatNameQuery), UserModel.find(formatEmailQuery)])
    .then(result => {
        return [!!result[0].length, !!result[1].length];
    })
    .catch(err => {
        return Promise.reject(err);
    })

}

module.exports = { insertUser, checkCredentials }