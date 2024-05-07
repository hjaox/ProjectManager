const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

async function findProjectByProjectId(userId, projectId) {
    try {
        const document = await UserModel.findById(userId);
        const project = document
            .projects.id(projectId);

        return project.toObject();
    } catch {

        return Promise.reject({ status: 404, msg: "User or project not found" })
    }
}

async function insertColumnInProject(userId, projectId, columnName) {

    try {
        const document = await UserModel.findById(userId);
        const project = document
            .projects.id(projectId);

        project
            .columns.push({ columnName });

        await document.save();

        return project.toObject();
    } catch {
        return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" });
    }
}

async function insertCardInColumn(userId, projectId, columnId, cardName) {
    try {
        const document = await UserModel.findById(userId);
        const project = document
            .projects.id(projectId);


        project.columns.id(columnId)
            .cards.push({ cardName });

        await document.save();

        return project.toObject();
    } catch {
        return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" });
    }
}

const deleteColumn = async (userId, projectId, columnId) => {
    try {
        const document = await UserModel.findById(userId);
        const project = document
            .projects.id(projectId)

        project
            .columns.id(columnId).deleteOne();

        await document.save();

        return project.toObject();
    } catch {
        return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" })
    }
}

const deleteCard = async (userId, projectId, columnId, cardId) => {
    try {
        const document = await UserModel.findById(userId);
        const project = document
            .projects.id(projectId);

        project
            .columns.id(columnId)
            .cards.id(cardId)
            .deleteOne();

        await document.save();

        return project.toObject();
    } catch {
        return Promise.reject({ status: 404, msg: "UserId, ProjectId or CardId not found" })
    }
}

const updateCard = async (userId, projectId, columnId, cardId, details) => {
    const sanitizedUserId = sanitizeFilter({ _id: userId });
    const sanitizedProjectId = sanitizeFilter({ _id: projectId });
    const sanitizedColumnId = sanitizeFilter({ _id: columnId });
    const sanitizedCardId = sanitizeFilter({ _id: cardId });

    try {
        const doc = await UserModel.findById(sanitizedUserId);

        doc
            .projects.id(sanitizedProjectId)
            .columns.id(sanitizedColumnId)
            .cards.id(sanitizedCardId)
            .details = details;


        await doc.save({ validateBeforeSave: false });

        return doc
            .projects.id(sanitizedProjectId).toObject();

    } catch (err) {
        return Promise.reject({ status: 404, msg: "UserId, ProjectId or CardId not found" })
    }
}


module.exports = {
    findProjectByProjectId,
    insertColumnInProject,
    insertCardInColumn,
    deleteColumn,
    deleteCard,
    updateCard
}