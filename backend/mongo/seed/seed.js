const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
const db = require("../connection");

function seed({usersData, projectsData, columnsData, cardsData}) {
    return db
    .then(() => {
        return mongoose.connection.dropDatabase();
    })
    .then(() => {
        return UserModel.create(usersData);
    })
    .then(() => {
        return seedProjectsData(projectsData);
    })
    .then(() => {
        return seedColumnsData(columnsData);
    })
    .then(() => {
        return seedCardsData(cardsData);
    })
    .catch(err => {
        console.log(err)
    })
};

function seedProjectsData(projectsData) {
    const projectPromises = projectsData.map(({projectName, owner}) => {
        return UserModel.findOneAndUpdate(
            {
                name: owner
            },
            {
                $push: {projects: {projectName}}
            }).exec()
    });

    return Promise.all(projectPromises)
}

function seedColumnsData(columnsData) {
    const columnPromises = columnsData.map(({columnName, forProject, owner}) => {
        return UserModel.findOneAndUpdate(
            {
                name: owner
            },
            {
                $push: {
                    "projects.$[a].columns": {columnName}
                }
            },
            {
                arrayFilters: [{"a.projectName": forProject}]
            }).exec()
    });

    return Promise.all(columnPromises);
}

function seedCardsData(cardsData) {
    const cardPromises = cardsData.map(({for_column, for_project, owner, title}) => {
        return UserModel.findOneAndUpdate(
            {
                name: owner
            },
            {
                $push: {
                    "projects.$[a].columns.$[b].cards": {cardName: title}
                }
            },
            {
                arrayFilters: [{"a.projectName": for_project}, {"b.columnName": for_column}]
            }).exec()
    });

    return Promise.all(cardPromises);
}

module.exports = seed;