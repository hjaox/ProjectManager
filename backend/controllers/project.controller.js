const mongoose = require('mongoose');
const { findProjectByProjectId,
    insertColumnInProject,
    insertCardInColumn,
    deleteColumn } = require('../models/project.model');

function getProjectByProjectId(request, response, next) {
    const { projectId, userId } = request.params;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId or projectId" });

    return findProjectByProjectId(userId, projectId)
        .then(projectDetails => {
            return response.status(200).send({ projectDetails })
        })
        .catch(err => {
            next(err)
        })
}

function postColumnInProject(request, response, next) {
    const { userId, projectId, columnName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId or projectId" });

    return insertColumnInProject(userId, projectId, columnName)
        .then(updatedDocument => {
            return response.status(201).send({ updatedDocument });
        })
        .catch(err => {
            next(err);
        })
}

function postCardInColumn(request, response, next) {
    const { userId, projectId, columnId, cardName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId)) return response.status(400).send({ msg: "Invalid userId, projectId or columnId" });

    return insertCardInColumn(userId, projectId, columnId, cardName)
        .then(updatedDocument => {
            return response.status(201).send({ updatedDocument });
        })
        .catch(err => {
            next(err)
        })
}

const removeColumn = async (request, response, next) => {
    const { userId, projectId, columnId } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId)) return response.status(400).send({ msg: "Invalid userId, projectId or columnId" });

    try {
        const updatedProjectDetails = await deleteColumn(userId, projectId, columnId);

        return response.status(202).send({ projects: updatedProjectDetails });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeColumn
}