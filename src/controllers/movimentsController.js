const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const express = require('express')
const Moviments = require('../models/MovimentsList')

class ListMovimentsController {

    teste = async (req, res) => {
        try {
            const moviment = await Moviments.find()
            return res.send(200, { moviment })
        } catch (error) {
            console.log(error.date)
            return res.send(400).json({ msg: 'ocorreu um erro' })
        }
    }

    findById = async (req, res) => {
        const { id } = req.params
        try {
            const moviment = await Moviments.findById(id)
            return res.status(200, { msg: moviment })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'ocorreu um erro' })
        }
    }

    create = async (req, res) => {
        const { label, value, date, type } = req.body

        const moviments = new Moviments({
            label, value, date, type
        })
        try {
            await moviments.save()
            return res.status(201).json({ msg: 'Movimentação adicionada!' })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'ocorreu um erro' })
        }
    }
}

module.exports = new ListMovimentsController()