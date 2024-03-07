const { findProjectByProjectId,
    insertColumnInProject } = require('../models/project.model');

function getProjectByProjectId(request, response, next) {
    const { projectId, userId } = request.params;

    return findProjectByProjectId(userId, projectId)
    .then(project => {
        return response.status(200).send({project})
    })
}

function postColumnInProject(request, response, next) {
    const { userId, projectId, columnName } = request.body;

    return insertColumnInProject(userId, projectId, columnName)
    .then(updatedDocument => {
        return response.status(201).send({updatedDocument});
    })
    .catch(err => {
        next(err);
    })
}

module.exports = { getProjectByProjectId, postColumnInProject }