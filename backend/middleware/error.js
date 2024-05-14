const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server Error"

    //Wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found with this id. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    //Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Enterd`
        err = new ErrorHandler(message, 400)
    }
    //Wrong jwt error
    if(err.name === 'JsonWebTokenError'){
        const message = 'Your url is invalid please try again letter'
        err = new ErrorHandler(message, 401)
    }
    //Jwt expired
    if(err.name === 'TokenExpiredError'){
        const message = 'Your url is expired please try again letter'
        err = new ErrorHandler(message, 401)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
};