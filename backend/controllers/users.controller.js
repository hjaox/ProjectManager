const { allUsersData,
    userData } = require('../models/users.model');

function getAllUsersData(_ , response, next) {
    return allUsersData()
    .then(allUsers => {
        response.status(200).send({allUsers});
    });
};

function getUserData(request, response, next) {
    const { username } = request.params;
    return userData(username)
    .then(user => {
        return response.status(200).send({user})
    })
    .catch(next)
}

module.exports = { getAllUsersData,
    getUserData};