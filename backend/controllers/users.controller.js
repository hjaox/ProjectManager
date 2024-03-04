const { allUsersData,
    userData } = require('../models/users.model');

function getAllUsersData(_ , response, next) {
    return allUsersData()
    .then((usersData) => {
        response.status(200).send({allUsers: usersData});
    });
};

function getUserData(request, response, next) {
    const { username } = request.params;
    return userData(username)
    .then((userDataResult) => {
        return response.status(200).send({user: userDataResult})
    })
    .catch(next)
}

module.exports = { getAllUsersData,
    getUserData};