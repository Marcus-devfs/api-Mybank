require('dotenv').config()
const authController = require('../src/controllers/authController')
const {checkToken} = require('./validators/auth')
const express = require('express')
const mongoose = require('mongoose')
const movimentsController = require('./controllers/movimentsController')

const app = express()


//config JSON

//Route auth
app.use(express.json())
app.post('/auth/login',authController.doLogin)
app.post('/auth/register', authController.doRegister)
app.post('/auth/login/token', checkToken, authController.doLoginByToken)

//Route Movimentações
app.get('/moviments', movimentsController.teste)
app.get('/moviment/:id', movimentsController.findByIdUser)
app.post('/moviment', movimentsController.create)


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












