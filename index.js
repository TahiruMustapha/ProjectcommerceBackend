const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: "http://localhost:3000",  // Ensure no trailing slash here
    credentials: true                // Allow credentials (cookies, HTTP authentication)
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running "+PORT)
    })
})
