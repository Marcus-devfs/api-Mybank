const mongoose = require('mongoose')


const CategoryList = mongoose.model('categoryList', new mongoose.Schema({
    categoryName: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    color: {
        type: String
    },
    value: {
        type: Number,
        required: true,
    },
    
}));

module.exports = CategoryList