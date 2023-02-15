const UserController = require('../controllers/userController')
const routes = require('express').Router()
const {checkToken} = require('../validators/auth')

routes.get('/user', checkToken, UserController.read)
routes.get('/user/:userId', UserController.readById)
routes.post('/user', checkToken, UserController.create)
routes.patch('/user/:userId', checkToken, UserController.update)
routes.delete('/user/:userId', checkToken, UserController.delete)

module.exports = routes