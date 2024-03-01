const { getUserData, getAllUsersData } = require("../controllers/users.controller");
const usersRouter = require("express").Router();


usersRouter
.get("/", getAllUsersData)
.get("/:username/", getUserData);

module.exports = usersRouter;
