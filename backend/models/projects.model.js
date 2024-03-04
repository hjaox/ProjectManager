const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function selectProjectsByUserID(userID) {
    const formatQuery = sanitizeFilter({_id: userID});

    return UserModel.findById(formatQuery, "projects")
    .setOptions({sanitizeFilter: true})
    .then(({projects}) => {
        return projects
    })
}

module.exports = { selectProjectsByUserID }