const { getProjectsByUserId } = require("../controllers/projects.controller");

const projectsRouter = require("express").Router();

projectsRouter.get("/:userID", getProjectsByUserId);

module.exports = projectsRouter;