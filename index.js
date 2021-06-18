//import dev modules
const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const cors = require('cors')

//import local modules
const addressRouter = require('./routes/address')
const authRouter = require('./routes/auth')
const createConnection = require('./models')

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//use routing
app.use('/address', addressRouter)
app.use('/auth', authRouter)
app.get('/', ((req, res) => {
    res.send('got the request')
}))


app.listen(process.env.PORT, () => {
    console.log('Server is listening on ' + process.env.PORT)
    createConnection()
})