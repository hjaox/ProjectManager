const { findProjectsByUserId } = require('../models/projects.model');

function getProjectsByUserId(request , response, next) {
    const { userId } = request.params;
    return findProjectsByUserId(userId)
    .then(projectsDataByUserIDResult => {
        return response.status(200).send({projects: projectsDataByUserIDResult});
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { getProjectsByUserId }