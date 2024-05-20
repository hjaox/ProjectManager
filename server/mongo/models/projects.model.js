const mongoose = require("mongoose");
const columnSchema = require("./columns.model");

const projectSchema = mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        columns:[columnSchema],
        background: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = projectSchema;