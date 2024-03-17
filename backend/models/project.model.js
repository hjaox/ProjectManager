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

    return UserModel.findOneAndUpdate({ ...formatQuery },
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

const deleteProjectById = async (userId, projectId) => {
    const formatQuery = sanitizeFilter({ _id: userId });
    const formatProjId = sanitizeFilter({ _id: projectId });
    let doc;

    try {
        doc = await UserModel.findById(formatQuery);
        doc.projects.id(formatProjId).deleteOne();
        await doc.save();
        return doc;
    } catch (err) {
        return Promise.reject({ status: 404, msg: "UserId or ProjectId not found" })
    }
}

module.exports = {
    findProjectByProjectId,
    insertColumnInProject,
    insertCardInColumn,
    deleteProjectById
}