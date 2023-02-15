const InvestmentController = require('../controllers/investmentController')
const routes = require('express').Router()

routes.get('/investmentList', InvestmentController.index)
routes.post('/investmentList/create', InvestmentController.createInvestment)
routes.delete('/investmentList/delete/:id', InvestmentController.deleteInvestment)
routes.get('/investmentList/:id', InvestmentController.readInvestmentId)
routes.post('/investmentList', InvestmentController.listFilterInvestiments)

module.exports = routes