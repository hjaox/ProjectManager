const { allUsersData,
    userData } = require('../models/users.model');

function getAllUsersData(_ , response, next) {
    return allUsersData()
    .then((usersData) => {
        response.status(200).send({users: usersData});
    });
};

function getUserData(request, response, next) {
    const { username } = request.params;
    const { password } = request.params;
    return userData(username, password)
    .then((userDataResult) => {
        return response.status(200).send({user: userDataResult})
    })
    .catch(next)
}

module.exports = { getAllUsersData,
    getUserData};