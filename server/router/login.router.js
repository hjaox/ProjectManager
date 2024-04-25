const { loginUser } = require("../controllers/login.controller");

const loginRouter = require("express").Router();

loginRouter.post("/", loginUser)

module.exports = loginRouter;