const { getAllUsersData,
getUserData } = require('./controllers/users.controller');
const {serverErrorHandler, customErrorHandler} = require('./error-handlers');
const { getProjectsByUserID } = require('./controllers/projects.controller');


const cors = require("cors");

const express = require('express');

const app = express();

app.use(cors());

app.get(`/api/users`, getAllUsersData);

app.get(`/api/user/:username/:password`, getUserData);

app.get(`/api/projects/:userID`, getProjectsByUserID)

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;