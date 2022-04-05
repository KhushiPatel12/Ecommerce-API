const express = require('express')
require('./database/database')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product') 
const productTypeRouter = require('./routers/productType')

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(productRouter)
app.use(productTypeRouter)

module.exports=app