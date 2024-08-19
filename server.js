const express=require('express')
const dotenv=require('dotenv')
const rateLimit=require('express-rate-limit')
const weatherRoutes = require('./routes/weatherRoutes')


dotenv.config()

const app=express()
const port=process.env.PORT

const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100
})

app.use(limiter)

app.use('/',weatherRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})