const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const express = require('express')


// const app = express()
// app.use(express.json())


class authController {

    index = async (req, res) => {
        try {
            const user = await User.find()
            return res.status(200).send({ msg: user })
        } catch (error) {
            console.log(error.date)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    doLogin = async (req, res) => {

        const { email, password } = req.body

        if (!password) return res.status(400).json({ success: false, msg: 'Invalid password data' })
        if (!email) return res.status(400).json({ success: false, msg: 'Invalid e-mail data' })

        const user = await User.findOne({ email }).select('+password')

        if (!user) return res.status(401).json({ success: false, msg: 'Invalid credentials' })
        if (!user.password) return res.status(400).json({ success: false, msg: 'User access is not allowed' })

        const result = await bcrypt.compare(password, user.password)

        if (!result) return res.status(401).json({ success: false, msg: 'Invalid credentials' })

        const jwtToken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.SECRET
        )

        user.password = undefined

        return res.status(200).json({ user, success: true, token: jwtToken })
    }

    doLoginByToken = async (req, res) => {

        const { userId } = req.currentUser
        const user = await User.findOne({ _id: userId })
        const jwtToken = jwt.sign(
            {
                userId: userId,
            },
            process.env.SECRET
        )

        return res.status(200).json({ user, success: true, token: jwtToken })
    }

    doRegister = async (req, res) => {

        const { name, email, password, confirmpassword } = req.body

        //validation
        if (!name) { return res.status(422).json({ msg: 'O nome é obrigatório!' }) }
        if (!email) { return res.status(422).json({ msg: 'O email é obrigatório!' }) }
        if (!password) { return res.status(422).json({ msg: 'A password é obrigatória!' }) }
        if (password !== confirmpassword) { return res.status(422).json({ msg: 'As senhas não conferem! Verifique e tente novamente' }) }

        //check exists user
        const UserExists = await User.findOne({ email: email })

        if (UserExists) { return res.status(422).json({ msg: 'Por favor, ultilize outro e-mail' }) }

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = new User({
            name,
            email,
            password: passwordHash,

        })

        try {
            await user.save()
            return res.status(201).json({ msg: 'Usuario criado com Sucesso!' })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'ocorreu um erro' })
        }

    }

    doCheckToken = async (req, res) => {

        const id = req.params.id
        //check user

        const user = await User.findById(id, `-password`)
        console.log(user)

        if (!user) {
            return res.status(404).json({ msg: 'Usuario não encontrado' })
        }
        return res.status(200).json({ user })

    }

    recoverPassword = async (req, res) => {
        const { email } = req.body

        const newPassword = this.generateRadomPassword(6)
        const password = await bcrypt.hash(newPassword, 6)

        try {
            User.findOneAndUpdate({ email }, { password }).exec()
        } catch (error) {
            console.log('erro',error)
        }

        return res.status(200).send({ success: true })
    }

    generateRadomPassword(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    updatePassword = async (req, res) => {
        
        const { updatePassword } = req.body
        const { email, senha } = updatePassword

        const newPassword = senha
        const password = await bcrypt.hash(newPassword, 10)

        try {
            User.findOneAndUpdate({ email }, { password }).exec()
        } catch (error) {
            console.log(error)
        }

        return res.status(200).send({newPassword})
    }

}

module.exports = new authController()