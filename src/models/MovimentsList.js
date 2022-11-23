const mongoose = require('mongoose')

const Moviments = mongoose.model('moviments', {
    label: String,
    value: String,
    createdAt: String,
    type: Number,
    createdBy:String,
});

// Exemplo
// id: 1,
// label: 'Boleto internet',
// value: '105,00',
// date: '20/11/2022',
// type: 0 dispesas,


module.exports = Moviments