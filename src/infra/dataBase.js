const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yjikcrt.mongodb.net/?retryWrites=true&w=majority`;

module.exports = async () => {
    mongoose.connect(DB_URL).
        then(() => {
            app.listen(3000)
            console.log('Conectado ao banco...')
        })
        .catch((err) => console.log(err))
}