const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const express = require('express')
const Moviments = require('../models/MovimentsList')
const User = require('../models/User')

class ListMovimentsController {

    index = async (req, res) => {
        try {
            const moviments = await Moviments.find()
            return res.status(200).send({ msg: moviments })
        } catch (error) {
            console.log(error.date)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    findById = async (req, res) => {
        const { id } = req.params
        try {
            const moviments = await Moviments.findById(id)
            return res.status(200).send({ msg: moviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    create = async (req, res) => {
        try {
            const { moviments } = req.body
            const { userId } = req.currentUser
            const newMoviments = await Moviments.create({ createdBy: userId, ...moviments })
            console.log(newMoviments)


            // await newMoviments.save()
            return res.status(201).send({ success: true, msg: 'Movimentação adicionada!', moviments: newMoviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }
}

module.exports = new ListMovimentsController()