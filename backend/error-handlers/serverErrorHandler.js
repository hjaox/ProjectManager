function serverErrorHandler(err, _, response, __) {
    response.status(500).send("Internal Server Error")
}

module.exports = serverErrorHandler