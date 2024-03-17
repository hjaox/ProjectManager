const { getProjectsByUserId, removeProject } = require("../controllers/projects.controller");

const projectsRouter = require("express").Router();

projectsRouter
    .get("/:userId", getProjectsByUserId)
    .delete("/:userId/:projectId", removeProject);

module.exports = projectsRouter;