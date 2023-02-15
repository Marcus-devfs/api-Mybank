const MovimentsController = require('../controllers/movimentsController')
const routes = require('express').Router()

routes.get('/moviments', MovimentsController.index)
routes.get('/moviment/:id', MovimentsController.findByIdUser)
routes.post('/moviment/create', MovimentsController.create)
routes.delete('/moviment/:id', MovimentsController.delete)
routes.post('/movimentsList', MovimentsController.listFilterMoviments)
routes.get('/categoryList/:id', MovimentsController.categoryFind)
routes.patch('/categoryList/:id', MovimentsController.updateCategory)
routes.post('/categoryList/create', MovimentsController.createCategory)
routes.delete('/categoryList/:id', MovimentsController.deleteCategory)

module.exports = routes