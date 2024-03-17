const mongoose = require('mongoose');
const { findProjectsByUserId,
    deleteProjectById,
    insertProject } = require('../models/projects.model');

function getProjectsByUserId(request, response, next) {
    const { userId } = request.params;

    if (!mongoose.isValidObjectId(userId)) return response.status(400).send({ msg: "Invalid UserId" });

    return findProjectsByUserId(userId)
        .then(projectList => {
            return response.status(200).send({ projects: projectList });
        })
        .catch(err => {
            next(err)
        })
}

function removeProject(request, response, next) {
    const { userId, projectId } = request.params;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(projectId)) return response.status(400).send({ msg: "Invalid userId, projectId or columnId" });

    return deleteProjectById(userId, projectId)
        .then(([projects]) => {
            return response.status(202).send({ projects })
        })
        .catch(err => {
            next(err)
        })
}

async function addProject(request, response, next) {
    const { userId, projectName } = request.body;

    if (!mongoose.isValidObjectId(userId)) return response.status(400).send({ msg: "Invalid userId" });

    try {
        const updatedProjectList = await insertProject(userId, projectName);
        return response.status(201).send({projects: updatedProjectList})
    } catch (err) {
        next(err);
    }
}

module.exports = { getProjectsByUserId, removeProject, addProject }