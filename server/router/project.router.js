const { getProjectByProjectId,
    postColumnInProject,
    postCardInColumn,
    removeColumn,
    removeCard,
    editCard} = require("../controllers/project.controller");

const projectRouter = require("express").Router();

projectRouter
    .get("/:userId/:projectId", getProjectByProjectId)
    .post("/column", postColumnInProject)
    .delete("/column", removeColumn)
    .post("/column/card", postCardInColumn)
    .delete("/column/card", removeCard)
    .patch("/column/card", editCard)


module.exports = projectRouter;