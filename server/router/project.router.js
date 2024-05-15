const { getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeColumn,
    removeCard,
    editCard,
    editColumn,
    editProject} = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
    .get("/:userId/:projectId", getProjectByProjectId)
    .patch("/", editProject)
    .post("/column", postColumnInProject)
    .delete("/column", removeColumn)
    .patch("/column", editColumn)
    .post("/column/card", postCardInColumn)
    .delete("/column/card", removeCard)
    .patch("/column/card", editCard)


module.exports = projectRouter;