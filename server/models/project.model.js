const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function findProjectByProjectId(userId, projectId) {
    const formatQuery = sanitizeFilter({ _id: userId });
    const formatProjection = sanitizeFilter({ _id: projectId });

    return UserModel.find(formatQuery, {
        projects: {
            $elemMatch: formatProjection
        }
    })
        .then(([{ projects }]) => {
            return projects[0]
        })
        .catch(err => {
            return Promise.reject({ status: 404, msg: "User or project not found" })
        })
}

function insertColumnInProject(userId, projectId, columnName) {
    const formatQuery = sanitizeFilter({ _id: userId });
    const formatFilter = sanitizeFilter({ _id: projectId });
    const formatInsert = sanitizeFilter({ columnName });

    return UserModel.findOneAndUpdate(formatQuery,
        {
            $push: {
                "projects.$[a].columns": formatInsert
            }
        }
        , {
            arrayFilters: [{ "a._id": formatFilter }],
            new: true,
            projection: { projects: { $elemMatch: formatFilter } }
        })
        .then(updatedDocument => {
            if (!updatedDocument) return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" })

            return updatedDocument.projects[0];
        })
        .catch(err => {
            return Promise.reject(err);
        })
}

function insertCardInColumn(userId, projectId, columnId, cardName) {
    const formatQuery = sanitizeFilter({ _id: userId });
    const formatFilterProjId = sanitizeFilter({ _id: projectId });
    const formatFilterColId = sanitizeFilter({ _id: columnId });
    const formatInsert = sanitizeFilter({ cardName });

    return UserModel.findOneAndUpdate(formatQuery,
        {
            $push: {
                "projects.$[a].columns.$[b].cards": formatInsert
            }
        }
        , {
            arrayFilters: [{ "a._id": formatFilterProjId }, { "b._id": formatFilterColId }],
            new: true,
            projection: { projects: { $elemMatch: formatFilterProjId } }
        })
        .then(updatedDocument => {
            if (!updatedDocument) return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" })

            return updatedDocument.projects[0];
        })
        .catch(err => {
            return Promise.reject(err);
        })
}

const deleteColumn = async (userId, projectId, columnId) => {
    const sanitizedUserId = sanitizeFilter({ _id: userId });
    const sanitizedProjectId = sanitizeFilter({ _id: projectId });
    const sanitizedColumnId = sanitizeFilter({ _id: columnId });
    let doc;

    try {
        doc = await UserModel.findById(sanitizedUserId);

        doc
            .projects.id(sanitizedProjectId)
            .columns.id(sanitizedColumnId).deleteOne();

        await doc.save();

        return doc.projects
    } catch (err) {
        return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" })
    }
}

const deleteCard = async (userId, projectId, columnId, cardId) => {
    const sanitizedUserId = sanitizeFilter({ _id: userId });
    const sanitizedProjectId = sanitizeFilter({ _id: projectId });
    const sanitizedColumnId = sanitizeFilter({ _id: columnId });
    const sanitizedCardId = sanitizeFilter({ _id: cardId });
    let doc;

    try {
        doc = await UserModel.findById(sanitizedUserId);

        doc
            .projects.id(sanitizedProjectId)
            .columns.id(sanitizedColumnId)
            .cards.id(sanitizedCardId).deleteOne();

        await doc.save();

        return doc.projects
    } catch (err) {
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