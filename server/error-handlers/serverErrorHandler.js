function serverErrorHandler(err, _, response, __) {
    console.log(err)
    return response.status(500).send("Internal Server Error")
}

module.exports = serverErrorHandler