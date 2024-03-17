const { getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeProject } = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
    .get("/:userId/:projectId", getProjectByProjectId)
    .delete("/:userId/:projectId", removeProject)
    .post("/column", postColumnInProject)
    .post("/column/card", postCardInColumn)


module.exports = projectRouter;