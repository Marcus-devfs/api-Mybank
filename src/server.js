require('dotenv').config()
const authController = require('../src/controllers/authController')
const checkToken = require('./validators/auth')
const express = require('express')
const mongoose = require('mongoose')

const app = express()


//config JSON
app.use(express.json())
app.post('/auth/login',authController.doLogin)
app.post('/auth/register', authController.doRegister)
app.get("/user/:id", checkToken, authController.doCheckToken)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//conection BANCO
const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yjikcrt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).
    then(() => {
        app.listen(3000)
        console.log('Conectado ao banco de DADOS')
    })
    .catch((err) => console.log(err))












