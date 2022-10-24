const AuthController = require('../controllers/authController')
const routes = require('express').Router()
const {checkToken} = require('../validators/auth')

routes.post('/auth/login',AuthController.doLogin)
routes.post('/auth/register', AuthController.doRegister)
routes.get("/user/:id", checkToken, AuthController.doCheckId)

module.exports = routes