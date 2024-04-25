const { registerUser } = require("../controllers/register.controller");

const registerRouter = require("express").Router();

registerRouter
.post("/", registerUser)

module.exports = registerRouter