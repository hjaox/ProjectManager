const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function selectProjectsByUserID(userID) {
    const formatUserId = sanitizeFilter({_id: userID});

    return UserModel.findById(formatUserId, "projects")
    .setOptions({sanitizeFilter: true})
    .then(res => {
        console.log(res)
    })
}

module.exports = { selectProjectsByUserID }