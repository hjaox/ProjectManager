const { findProjectByProjectId } = require('../models/project.model');

function getProjectByProjectId(request, response, next) {
    const { projectId, userId } = request.params;

    return findProjectByProjectId(userId, projectId)
    .then(project => {
        return response.status(200).send({project})
    })
}

module.exports = { getProjectByProjectId }