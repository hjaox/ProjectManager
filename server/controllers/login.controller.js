const { authenticateUser } = require("../models/login.model");

function loginUser(request, response, next) {
    const { name, password } = request.body;

    return authenticateUser(name, password)
    .then(loginDetails => {
        return response.status(200).send({loginDetails})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { loginUser }