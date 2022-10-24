const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()



module.exports = () => {
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
}

mongoose.Promise = global.Promise