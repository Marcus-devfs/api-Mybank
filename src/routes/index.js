
const AuthController = require('../controllers/authController')
const InvestmentController = require('../controllers/investmentController')
const MovimentsController = require('../controllers/movimentsController')
const UserController = require('../controllers/userController')
const routes = require('express').Router()
const {checkToken} = require('../validators/auth')


routes.get('/', AuthController.index)
routes.post('/auth/login',AuthController.doLogin)
routes.post('/auth/register', AuthController.doRegister)
routes.post('/login/token', checkToken, AuthController.doLoginByToken)
routes.post('/login/recover', AuthController.recoverPassword)
routes.post('/login/updatePass', checkToken, AuthController.updatePassword)
routes.post('/login/updateData', checkToken, AuthController.updateData)


routes.get('/investmentList', InvestmentController.index)
routes.post('/investmentList/create', InvestmentController.createInvestment)
routes.delete('/investmentList/delete/:id', InvestmentController.deleteInvestment)
routes.get('/investmentList/:id', InvestmentController.readInvestmentId)
routes.post('/investmentList', InvestmentController.listFilterInvestiments)

routes.get('/moviments', MovimentsController.index)
routes.get('/moviment/:id', MovimentsController.findByIdUser)
routes.post('/moviment/create', MovimentsController.create)
routes.delete('/moviment/:id', MovimentsController.delete)
routes.post('/movimentsList', MovimentsController.listFilterMoviments)
routes.get('/categoryList/:id', MovimentsController.categoryFind)
routes.patch('/categoryList/:id', MovimentsController.updateCategory)
routes.post('/categoryList/create', MovimentsController.createCategory)
routes.delete('/categoryList/:id', MovimentsController.deleteCategory)

routes.get('/user', checkToken, UserController.read)
routes.get('/user/:userId', UserController.readById)
routes.post('/user', checkToken, UserController.create)
routes.patch('/user/:userId', checkToken, UserController.update)
routes.delete('/user/:userId', checkToken, UserController.delete)

module.exports = routes