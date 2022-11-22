const mongoose = require('mongoose')
const { Schema } = mongoose;

const MovimentsSchema = new Schema({

    label: {
        type: String,
    },
    value: {
        type: String,
    },
    type: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        select: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // label: String,
    // value: String,
    // date: String,
    // type: Number,
    // createdBy: String,
});

// Exemplo
// id: 1,
// label: 'Boleto internet',
// value: '105,00',
// date: '20/11/2022',
// type: 0 dispesas,


const Moviments = mongoose.model('Moviments', MovimentsSchema);
module.exports = Moviments