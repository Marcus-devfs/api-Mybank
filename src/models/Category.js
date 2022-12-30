const mongoose = require('mongoose')


const CategoryList = mongoose.model('categoryList', new mongoose.Schema({
    categoryName: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}));

module.exports = CategoryList