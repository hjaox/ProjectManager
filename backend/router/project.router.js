const { getProjectByProjectId,
    postColumnInProject } = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
.get("/:userId/:projectId", getProjectByProjectId)
.post("/column", postColumnInProject);

module.exports = projectRouter;