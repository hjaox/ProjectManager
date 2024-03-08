const { getProjectsByUserId } = require("../controllers/projects.controller");

const projectsRouter = require("express").Router();

projectsRouter.get("/:userId", getProjectsByUserId);

module.exports = projectsRouter;