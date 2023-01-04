const bcrypt = require('bcrypt')
const User = require('./../models/User')

class UserController {

    create = async (req, res) => {
        try {
            const { user } = req.body
            let { password = null } = user

            if (password) password = await bcrypt.hash(password, 10)

            let newUser = await User.create({
                ...user,
                password
            })

            newUser = await User.findById(newUser._doc._id)

            res.send(200, { success: true, user: newUser, msg: 'User created' })
        } catch (error) {
            res.send(400, { success: false, error });
        }
    }

    read = async (req, res) => {
        try {
            const users = await User.find().exec()

            res.send(200, { success: true, users })
        } catch (error) {
            res.send(400, { success: false, error });
        }
    }

    readById = async (req, res) => {
        try {
            const { _id } = req.params
            const user = await User.find({ user: _id })

            res.status(200).send({ success: true, user })
        } catch (error) {
            res.status(200).send({ success: false, error });
        }
    }

    update = async (req, res) => {
        try {
            const { userId } = req.params
            const { user } = req.body
            const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true }).exec()

            res.send(200, { success: true, user: updatedUser })
        } catch (error) {
            res.send(400, { success: false, error });
        }
    };

    delete = (req, res) => {
        try {
            const { userId } = req.params
            User.findByIdAndDelete(userId).exec()

            res.send(200, { success: true })
        } catch (error) {
            res.send(400, { success: false, error });
        }
    }
}



module.exports = new UserController()