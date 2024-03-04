const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
    {
        cardName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = cardSchema;