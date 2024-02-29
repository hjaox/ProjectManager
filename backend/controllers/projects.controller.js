const { selectProjectsByUserID } = require('../models/projects.model');

function getProjectsByUserID(request , response, next) {
    const { userID } = request.params;
    return selectProjectsByUserID(userID)
    .then(projectsDataByUserIDResult => {
        return response.status(200).send({projects: projectsDataByUserIDResult});
    })
}

module.exports = { getProjectsByUserID }