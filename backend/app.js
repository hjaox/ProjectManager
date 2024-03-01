const connectDB = require('./db/connection');
const {serverErrorHandler, customErrorHandler} = require('./error-handlers');
const apiRouter = require('./router/api.router');
const cors = require("cors");
const express = require('express');

const app = express();

connectDB(app);

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;