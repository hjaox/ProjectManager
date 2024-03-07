const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function findProjectByProjectId(userId, projectId) {
    const formatQuery = sanitizeFilter({_id: userId});
    const formatProjection = sanitizeFilter({_id: projectId});

    return UserModel.find(formatQuery, {
        projects: {
            $elemMatch: formatProjection
        }
    })
    .then(([{projects}]) => {
        return projects[0]
    })

}

function insertColumnInProject(userId, projectId, columnName) {
    const formatQuery = sanitizeFilter({_id: userId});
    const formatFilter = sanitizeFilter({_id: projectId});
    const formatInsert = sanitizeFilter({columnName});

    return UserModel.findOneAndUpdate({...formatQuery},
        {
            $push: {
                "projects.$[a].columns": formatInsert
            }
        }
        ,{
            arrayFilters: [{"a._id": formatFilter}],
            new: true,
            projection: {projects: {$elemMatch: formatFilter}}
        })
    .then(updatedDocument => {
        return updatedDocument;
    })
    .catch(err => {
        return Promise.reject(err);
    })
}

module.exports = { findProjectByProjectId,
    insertColumnInProject }