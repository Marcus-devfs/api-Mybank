require('dotenv').config()
const authController = require('../src/controllers/authController')
const {checkToken} = require('./validators/auth')
const express = require('express')
const mongoose = require('mongoose')
const movimentsController = require('./controllers/movimentsController')
const userController = require('./controllers/userController')
const investmentController = require('./controllers/investmentController')

const app = express()


//config JSON

//Route auth
app.use(express.json())
app.get('/', authController.index)
app.post('/auth/login',authController.doLogin)
app.post('/auth/register', authController.doRegister)
app.post('/login/token', checkToken, authController.doLoginByToken)
app.post('/login/recover', authController.recoverPassword)
app.post('/login/updatePass', checkToken, authController.updatePassword)
app.post('/login/updateData', checkToken, authController.updateData)

//Route Movimentações
app.get('/moviments', movimentsController.index)
app.get('/moviment/:id', movimentsController.findByIdUser)
app.post('/moviment/create', movimentsController.create)
app.delete('/moviment/:id', movimentsController.delete)
app.post('/movimentsList', movimentsController.listFilterMoviments)

//Route Category
app.get('/categoryList/:id', movimentsController.categoryFind)
app.patch('/categoryList/:id', movimentsController.updateCategory)
app.post('/categoryList/create', movimentsController.createCategory)
app.delete('/categoryList/:id', movimentsController.deleteCategory)


//Route User
app.get('/user', checkToken, userController.read)
app.get('/user/:userId', userController.readById)
app.post('/user', checkToken, userController.create)
app.patch('/user/:userId', checkToken, userController.update)
app.delete('/user/:userId', checkToken, userController.delete)

//Route Investment
app.get('/investmentList', investmentController.index)
app.post('/investmentList/create', investmentController.createInvestment)
app.delete('/investmentList/delete/:id', investmentController.deleteInvestment)
app.get('/investmentList/:id', investmentController.readInvestmentId)
app.post('/investmentList', investmentController.listFilterInvestiments)


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//conection BANCO

// const DB_URL = `mongodb://MarcusSilva:${dbPassword}@ac-xy9xrsz-shard-00-00.yjikcrt.mongodb.net:27017,ac-xy9xrsz-shard-00-01.yjikcrt.mongodb.net:27017,ac-xy9xrsz-shard-00-02.yjikcrt.mongodb.net:27017/?ssl=true&replicaSet=atlas-afqtnv-shard-0&authSource=admin&retryWrites=true&w=majority`
const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yjikcrt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).
    then(() => {
        app.listen(3000)
        console.log('Conectado ao banco de DADOS')
    })
    .catch((err) => console.log(err))












