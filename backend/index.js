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
    .catch(()=> console.log('Failed to connect MONGODB') )
=======
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { test_routes, auth_routes } from "./routes/test.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Finance Tracker API Running",
  });
});

app.use("/api/test", test_routes);
app.use("/api/auth", auth_routes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
