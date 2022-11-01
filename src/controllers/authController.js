const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const express = require('express')


// const app = express()
// app.use(express.json())


class authController {

    doLogin = async (req, res) => {

        //desconstruir do body da API
        const { email, password } = req.body

        //validation
        if (!email) { return res.status(422).json({ msg: 'O email é obrigatório!' }) }
        if (!password) { return res.status(422).json({ msg: 'A password é obrigatória!' }) }

        //check user exists
        const user = await User.findOne({ email: email })

        if (!user) { return res.status(404).json({ msg: 'Usuario não encontrado' }) }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) { return res.status(400).json({ success: false, msg: 'Senha inválida!' }) }

        try {
            const secret = process.env.SECRET
            const jwtToken = jwt.sign({
                userId: user._id,
            },
                secret,
            )
            return res.status(200, { user, success: true, token: jwtToken })

        } catch (error) {
            console.log(error)

            return res.status(401, { success: false, msg: 'Invalid credentials' })
        }

    }

    doLoginByToken = async (req, res) => {

        const { userId } = req.currentUser
        const user = await User.findOne({ _id: userId })

        const secret = process.env.SECRET
        const jwtToken = jwt.sign({
            userId,
        },
            secret,
        )

        return res.send(200, { user, token: jwtToken })
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

}

module.exports = new authController()