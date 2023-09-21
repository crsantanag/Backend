import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import { db } from './config/db.config.js'
import cors from 'cors'

dotenv.config()

const app = express();

// Midlewares
app.use (cors())
app.use (express.json())
app.use (express.urlencoded({extended:true}))

// Midleware de rutas
// Todas las rutas comenzarán con '/api/v1'
app.use ('/api/v1', userRouter)
app.use ('/api/v1', productRouter)

db();

app.listen (process.env.PORT, () => {
    console.log (`Server está arriba en el puerto ${process.env.PORT}`) 
})