
export const errorHandler = (err,req,res,next) => {
    const status = 500
    res.status(status).json({
        success: false,
        message: err.message || 'Something went worng.',
        status
    })
    next()
}
