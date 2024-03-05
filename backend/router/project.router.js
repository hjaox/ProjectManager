const { getProjectByProjectId } = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter.get("/:userId/:projectId", getProjectByProjectId);

module.exports = projectRouter;