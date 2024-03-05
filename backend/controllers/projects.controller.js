const { findProjectsByUserId } = require('../models/projects.model');

function getProjectsByUserId(request , response, next) {
    const { userID } = request.params;

    return findProjectsByUserId(userID)
    .then(projectsDataByUserIDResult => {
        return response.status(200).send({projects: projectsDataByUserIDResult});
    })
}

module.exports = { getProjectsByUserId }