const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function findProjectByProjectId(userId, projectId) {
    const formatQuery = sanitizeFilter({_id: userId});
    const formatProjection = sanitizeFilter({_id: projectId});

    return UserModel.find(formatQuery, {projects: {$elemMatch: formatProjection}})
    .then(([{projects}]) => {
        return projects[0]
    })

}

module.exports = { findProjectByProjectId }