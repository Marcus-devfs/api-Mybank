const mongoose = require('mongoose')


const InvestmentList = mongoose.model('investmentList', new mongoose.Schema({
    type: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date(),
    },
    value: {
        type: Number,
        required: true,
    },
    
}));

module.exports = InvestmentList