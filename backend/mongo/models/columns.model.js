const mongoose = require("mongoose");
const cardSchema = require("./cards.model");

const columnSchema = mongoose.Schema(
    {
        columnName: {
            type: String,
            required: true
        },
        cards: [cardSchema]
    },
    {
        timestamps: true
    }
);

module.exports = columnSchema;