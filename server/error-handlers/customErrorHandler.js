function customErrorHandler(err, _, response, next) {
    if(err.status || err.msg) {
        response.status(err.status).send({msg: err.msg});
    } else {
        next(err)
    }
}

module.exports = customErrorHandler;