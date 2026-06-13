export const validate = (schema) => (req,res,next) => {
    const result = schema.safeParse(req.body)
    // console.log('keys',Obj)
    if(!result.success){
        const formatted = result.error.format()
        console.log('formatted',formatted)
        res.json({
            success: false,
            message: 'Invalid validation',
            error: Object.keys(formatted)
                .filter(field => field !== '_errors' )
                .map(field => ({
                    field,
                    message: formatted[field]._errors[0]
                }) )
        })
    }
    next()
}