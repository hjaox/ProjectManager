const loginRouter = require("./login.router");
const projectRouter = require("./project.router");
const projectsRouter = require("./projects.router");
const registerRouter = require("./register.router");
const usersRouter = require("./users.router");

const apiRouter = require("express").Router();

apiRouter
.use("/users", usersRouter)
.use("/projects", projectsRouter)
.use("/project", projectRouter)
.use("/login", loginRouter)
.use("/register", registerRouter)

module.exports = apiRouter;