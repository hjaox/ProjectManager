const UserModel = require("../mongo/models/user.model");
const { sanitizeFilter } = require('mongoose');

function findProjectsByUserId(userId) {
    const formatQuery = sanitizeFilter({_id: userId});

    return UserModel.findById(formatQuery, "projects")
    .then(({projects}) => {
        return projects
    })
    .catch(() => {
        return Promise.reject({status: 404, msg: "Not Found"});
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

module.exports = { findProjectsByUserId, deleteProjectById }