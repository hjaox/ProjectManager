const { getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeColumn } = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
    .get("/:userId/:projectId", getProjectByProjectId)
    .post("/column", postColumnInProject)
    .delete("/column", removeColumn)
    .post("/column/card", postCardInColumn)


module.exports = projectRouter;