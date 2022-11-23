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

    // findById = async (req, res) => {
    //     const { id } = req.params
    //     try {
    //         const moviment = await Moviments.findById(id)
    //         return res.status(200).send({ msg: moviment })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(400).send({ msg: 'ocorreu um erro' })
    //     }
    // }
    findByIdUser = async (req, res) => {

        const { createdBy } = req.body
        try {
            const moviments = await Moviments.find(createdBy)
            return res.status(200).send({ msg: moviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    create = async (req, res) => {
        
        const { label, value, createdAt, type, createdBy } = req.body
        const moviments = new Moviments({
            label, value, createdAt, type, createdBy,
        })
        
        try {
            await moviments.save()
             return res.status(201).send({ msg: 'Movimentação adicionada!', moviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }
}

module.exports = new ListMovimentsController()