const loginRouter = require("./login.router");
const projectsRouter = require("./projects.router");
const usersRouter = require("./users.router");

const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/projects", projectsRouter)
apiRouter.use("/login", loginRouter)

module.exports = apiRouter;