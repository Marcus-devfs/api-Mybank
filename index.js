require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes/index')
const app = express()

app.use(express.json())
app.use(routes)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yjikcrt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).
    then(() => {
        app.listen(3000)
        console.log('Conectado ao banco...')
    })
    .catch((err) => console.log(err))












