const { insertUser, checkCredentials } = require("../models/register.model");

function registerUser(request, response, next) {
    const { name, email, password } = request.body;

    return checkCredentials(name, email)
    .then(result => {
        if(result[0] && result[1]) return Promise.reject({status: 400, msg: "User and email already exists"});
        if(result[0]) return Promise.reject({status: 400, msg: "User already exists"});
        if(result[1]) return Promise.reject({status: 400, msg: "Email already exists"});

        return insertUser(name, email, password)
    })
    .then(newUser => {
        return response.status(201).send({newUser});
    })
    .catch(err => {
        next(err)
    })


}

module.exports = { registerUser }