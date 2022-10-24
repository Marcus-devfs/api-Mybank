const routes = require('express').Router()


routes.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!' })
  })

  module.exports = routes