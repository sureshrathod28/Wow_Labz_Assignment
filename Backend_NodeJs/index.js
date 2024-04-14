const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
let userroute=require('./Router/userRoute')
let homeRoute=require('./Router/homeProductRoute')
const MensFashionRouter = require('./Router/mensFashionRoute')
const paymentRouter=require('./Router/paymentRoute')
const addressRouter=require("./Router/addressRoute")
const app=express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Database successfully connected')
}).catch(()=>{
    console.log('Failed to connect with database')
})
app.use(bodyparser.json())
app.use(cors({}))
app.use('/',userroute)
app.use('/',homeRoute)
app.use('/',MensFashionRouter)
app.use('/',paymentRouter)
app.use('/',addressRouter)
app.use('/uploads', express.static('uploads'));
app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})
