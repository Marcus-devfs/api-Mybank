const mongoose = require('mongoose')


const Moviments = mongoose.model('moviments', new mongoose.Schema({
    label: String,
    value: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    type: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

// Exemplo
// id: 1,
// label: 'Boleto internet',
// value: '105,00',
// date: '20/11/2022',
// type: 0 dispesas,


module.exports = Moviments