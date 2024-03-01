const { getProjectsByUserID } = require("../controllers/projects.controller");

const projectsRouter = require("express").Router();

projectsRouter.get("/:userID", getProjectsByUserID);

module.exports = projectsRouter;