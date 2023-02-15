const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    password: {
        type: String,
    },
    telephone: {
        type: String,
    },
    dateBirth: {
        type: Date,
        default: new Date(),
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User