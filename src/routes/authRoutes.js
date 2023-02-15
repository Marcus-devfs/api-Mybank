
const AuthController = require('../controllers/authController')
const routes = require('express').Router()
const {checkToken} = require('../validators/auth')

routes.get('/', AuthController.index)
routes.post('/auth/login',AuthController.doLogin)
routes.post('/auth/register', AuthController.doRegister)
routes.post('/login/token', checkToken, AuthController.doLoginByToken)
routes.post('/login/recover', AuthController.recoverPassword)
routes.post('/login/updatePass', checkToken, AuthController.updatePassword)
routes.post('/login/updateData', checkToken, AuthController.updateData)

module.exports = routes