const { getUserData, getAllUsersData } = require("../controllers/users.controller");
const usersRouter = require("express").Router();


usersRouter
.get("/", getAllUsersData)
.get("/:name", getUserData);

module.exports = usersRouter;
