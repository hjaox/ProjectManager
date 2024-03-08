function mongoDBErrorHandler(err, request, response, next) {
    next(err)
}

module.exports = mongoDBErrorHandler