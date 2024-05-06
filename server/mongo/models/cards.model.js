const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
    {
        cardName: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true,
            default: "",
        }
    },
    {
        timestamps: true
    }
);

module.exports = cardSchema;