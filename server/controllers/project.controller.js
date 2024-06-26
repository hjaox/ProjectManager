const mongoose = require('mongoose');
const { findProjectByProjectId,
    insertColumnInProject,
    insertCardInColumn,
    deleteColumn,
    deleteCard,
    updateCard,
    updateColumn,
    updateProject } = require('../models/project.model');

async function getProjectByProjectId(request, response, next) {
    const { projectId, userId } = request.params;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId or projectId" });

    try {
        const project = await findProjectByProjectId(userId, projectId);

        return response.status(200).send({ project });
    } catch (err) {
        next(err);
    }
}

async function postColumnInProject(request, response, next) {
    const { userId, projectId, columnName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId or projectId" });

    try {
        const updatedProject = await insertColumnInProject(userId, projectId, columnName);

        return response.status(201).send({ updatedProject });
    } catch (err) {
        next(err);
    }
}

async function postCardInColumn(request, response, next) {
    const { userId, projectId, columnId, cardName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId)) return response.status(400).send({ msg: "Invalid userId, projectId or columnId" });

    try {
        const updatedProject = await insertCardInColumn(userId, projectId, columnId, cardName);

        return response.status(201).send({ updatedProject });

    } catch (err) {
        next(err);
    }
}

const removeColumn = async (request, response, next) => {
    const { userId, projectId, columnId } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId)) return response.status(400).send({ msg: "Invalid userId, projectId or columnId" });

    try {
        const updatedProject = await deleteColumn(userId, projectId, columnId);

        return response.status(202).send({ updatedProject });
    } catch (err) {
        next(err);
    }
}

const removeCard = async (request, response, next) => {
    const { userId, projectId, columnId, cardId } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId) || !mongoose.isValidObjectId(cardId)) return response.status(400).send({ msg: "Invalid userId, projectId, columnId or cardId" });

    try {
        const updatedProject = await deleteCard(userId, projectId, columnId, cardId);

        return response.status(202).send({ updatedProject });
    } catch (err) {
        next(err)
    }
}

const editCard = async (request, response, next) => {
    const { userId, projectId, columnId, cardId, details, cardName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId) || !mongoose.isValidObjectId(cardId)) return response.status(400).send({ msg: "Invalid userId, projectId, columnId or cardId" });

    try {
        const updatedProjectDetails = await updateCard(userId, projectId, columnId, cardId, { details }, { cardName });

        return response.status(200).send({ updatedProject: updatedProjectDetails });
    } catch (err) {
        next(err)
    }
}

const editColumn = async (request, response, next) => {
    const { userId, projectId, columnId, columnName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId) || !mongoose.isValidObjectId(columnId)) return response.status(400).send({ msg: "Invalid userId, projectId, or columnId" });

    try {
        const updatedProjectDetails = await updateColumn(userId, projectId, columnId, columnName);

        return response.status(200).send({ updatedProject: updatedProjectDetails });
    } catch (err) {
        next(err)
    }
}

const editProject = async (request, response, next) => {
    const { userId, projectId, projectName } = request.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId, or projectId" });

    try {
        const updatedProjectDetails = await updateProject(userId, projectId, projectName);

        return response.status(200).send({ updatedProject: updatedProjectDetails });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeColumn,
    removeCard,
    editCard,
    editColumn,
    editProject
}