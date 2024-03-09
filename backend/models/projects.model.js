const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function findProjectsByUserId(userId) {
    const formatQuery = sanitizeFilter({_id: userId});

    return UserModel.findById(formatQuery, "projects")
    .then(({projects}) => {
        return projects
    })
    .catch(() => {
        return Promise.reject({status: 404, msg: "Not Found"});
    })
}

module.exports = { findProjectsByUserId }