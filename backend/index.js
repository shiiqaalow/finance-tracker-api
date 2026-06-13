import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { auth_routes } from './routes/auth.js'
import { user_routes } from './routes/user.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { trans_routes } from './routes/transaction.js'
import { upload_router } from './routes/upload.js'
import { swaggerSpec } from './utils/swagger.js'
import  swaggerUi  from 'swagger-ui-express'
import { category_routes } from './routes/category.js'
dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 7000
const mongoURL = 
    process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URL_DEV
        : process.env.MONGO_URL_PRO

app.use(helmet())
app.use(cors({
    origin: [
        `http://localhost:${port}`,
        'http://localhost:5173'
    ]
}))
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// routes
app.get('/',(req,res)=>{
    res.status(200).send('Api is working')
})

app.use('/auth',auth_routes)
app.use('/users',user_routes)
app.use('/transactions',trans_routes)
app.use('/upload',upload_router)
app.use('/categories', category_routes)


// swagger api
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// errorHandler
app.use(errorHandler)

mongoose.connect(mongoURL)
    .then(()=>{
        console.log('Successfully connected to MONGODB')
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err)=> {
        console.error('Failed to connect MONGODB', err)
        process.exit(1)
    })