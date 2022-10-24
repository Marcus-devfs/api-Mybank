const express = require('express')
const cors = require('cors')
const setupRoutes = require('../api-Mybank/src/routes/index')
const connectDatabase = require('./src/infra/dataBase')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
setupRoutes(app)

app.listen(process.env.PORT || 3000, () => {

    connectDatabase()
})












