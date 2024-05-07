const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
    {
        cardName: {
            type: String,
            required: true
        },
        details: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
);

module.exports = cardSchema;