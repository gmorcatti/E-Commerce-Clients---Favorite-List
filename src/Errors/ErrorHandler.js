import AppError from "./AppError.js"

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).send({
            message: err.message
        })
    }

    const errorObj = {
        message: 'Internal Server Error',
        details: err.message
    }

    if (err.isAxiosError) {
        errorObj.type = 'Axios'
        errorObj.details = err.response.data
    }

    console.error(err)
    return res.status(500).send(errorObj)
}

export default errorHandler