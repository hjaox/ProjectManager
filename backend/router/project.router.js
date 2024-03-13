const { getProjectByProjectId,
    postColumnInProject,
    postCardInColumn } = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
.get("/:userId/:projectId", getProjectByProjectId)
.post("/column", postColumnInProject)
.post("/column/card", postCardInColumn);

module.exports = projectRouter;