const { ProjectModel } = require("../../mongo/models/projects.model");
const UserModel = require("../../mongo/models/user.model");
const mongoose = require("mongoose");
require("dotenv").config({
    path: `${__dirname}/../../.env.development`
});

function seed({usersData, projectsData, columnsData, cardsData}) {
    return mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
        return UserModel.create(usersData);
    })
    .then(() => {
        return seedProjectsData(projectsData);
    })
    .then(() => {
        return seedColumnsData(columnsData)
        return UserModel.findOneAndUpdate({name: "test", projects: {$elemMatch: {projectName: "project1For1"}}},{
            $push: {
                "projects.$.columns": {columnName: "test"}
            }
        })
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        mongoose.connection.close();
    });
};

function seedProjectsData(projectsData) {
    const projectPromises = projectsData.map(({projectName, owner}) => {
        return UserModel.findOneAndUpdate({name: owner}, {$push: {projects: {projectName}}})
    });

    return Promise.all(projectPromises)
}

function seedColumnsData(columnsData) {
    const columnPromises = columnsData.map(({columnName, forProject, owner}) => {
        return UserModel.findOneAndUpdate({name: owner, projects: {$elemMatch: {projectName: forProject}}}, {
            $push: {
                "projects.$.columns": {columnName}
            }
        })
    });

    return Promise.all(columnPromises);
}

module.exports = seed;