const { uploadImage, deleteAllImages } = require("../../utils/firebase/functions");
const { roll10 } = require("../../utils/utils");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

function seed({ usersData, projectsData, columnsData, cardsData }) {
    return mongoose.connection.dropDatabase()
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

async function seedProjectsData(projectsData) {
    await deleteAllImages();

    const projectPromises = projectsData.map(async ({ projectName, owner }, i) => {
        try {
            const document = await UserModel.findOne({ name: owner });
            const randomBackground = await uploadImage(`${__dirname}/data/images/${roll10()}.jpg`, i);

            document.projects.push({ projectName, background: randomBackground });

            await document.save();
        } catch (err) {
            console.log(err)
        }
    });

    return Promise.all(projectPromises)
}

function seedColumnsData(columnsData) {
    const columnPromises = columnsData.map(({ columnName, forProject, owner }) => {
        return UserModel.findOneAndUpdate(
            {
                name: owner
            },
            {
                $push: {
                    "projects.$[a].columns": { columnName }
                }
            },
            {
                arrayFilters: [{ "a.projectName": forProject }]
            }).exec()
    });

    return Promise.all(columnPromises);
}

function seedCardsData(cardsData) {
    const cardPromises = cardsData.map(({ for_column, for_project, owner, title, details }) => {
        return UserModel.findOneAndUpdate(
            {
                name: owner
            },
            {
                $push: {
                    "projects.$[a].columns.$[b].cards": { cardName: title, details }
                }
            },
            {
                arrayFilters: [{ "a.projectName": for_project }, { "b.columnName": for_column }]
            }).exec()
    });

    return Promise.all(cardPromises);
}

module.exports = seed;