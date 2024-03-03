const mongoose = require("mongoose");
const columnSchema = require("./columns.model");

const projectSchema = mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        columns:[columnSchema]
    },
    {
        timestamps: true
    }
);

const ProjectModel = mongoose.model("Project", projectSchema)

module.exports = {ProjectModel, projectSchema};