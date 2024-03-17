const { getProjectsByUserId, removeProject, addProject } = require("../controllers/projects.controller");

const projectsRouter = require("express").Router();

projectsRouter
    .get("/:userId", getProjectsByUserId)
    .post("/", addProject)
    .delete("/:userId/:projectId", removeProject);

module.exports = projectsRouter;