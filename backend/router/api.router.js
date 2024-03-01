const projectsRouter = require("./projects.router");
const usersRouter = require("./users.router");

const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/projects", projectsRouter);

module.exports = apiRouter;