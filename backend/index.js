import path from 'path'
import { fileURLToPath } from 'url'


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
        'http://localhost:5173',
        'http://localhost:5174',
    ]
}))
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// routes
app.get('/',(req,res)=>{
    res.status(200).send('Server is working 👍')
})

app.use('/api/auth',auth_routes)
app.use('/api/users',user_routes)
app.use('/api/transactions',trans_routes)
app.use('/api/profile',upload_router)
app.use('/api/categories', category_routes)


// swagger api
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


// Server frontend in Production

if(process.env.NODE_ENV === 'production' ) {
    const _dirname = path.dirname(fileURLToPath(import.meta.url))

    app.use(express.static(path.join(_dirname,'../frontend/dist')))

    // serve the frontend app

    app.get(/.*/,(req,res)=>{
        res.send(path.join(_dirname,'..','frontend','dist','index.html'))
    })
}



// errorHandler
app.use(errorHandler)

mongoose.connect(mongoURL)
    .then(()=>{
        console.log('Successfully connected to MONGODB')
        app.listen(port,()=>{
            console.log(`Server is running on port http://localhost:${port}`)
        })
    })
    .catch((err)=> {
        console.error('Failed to connect MONGODB', err)
        process.exit(1)
    })