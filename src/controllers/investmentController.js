const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const InvestmentList = require('../models/Investment')

class InvestmentListController {

    index = async (req, res) => {
        try {
            const investment = await InvestmentList.find()
            return res.status(200).send({ msg: investment })
        } catch (error) {
            console.log(error.date)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    createInvestment = async (req, res) => {

        const { type, value, date, user} = req.body

        let matches = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(date);
        if (matches == null) {
            return false;
        }
        let dia = matches[1];
        let mes = matches[2];
        let ano = matches[3];
        let data = `${ano}/${mes}/${dia}`;


        const investment = new InvestmentList({
            type, value, date: data, user
        })

        try {
            await investment.save()
            return res.status(201).send({ msg: 'Investimento realizado!', investment })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    deleteInvestment = async (req, res) => {
        try {
            const { id } = req.params
            InvestmentList.findByIdAndDelete(id).exec()
            return res.status(201).send({ msg: 'Investimento deletado!' })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    readInvestmentId = async (req, res) => {

        const { id } = req.params
        try {
            const investment = await InvestmentList.find({ user: id })
            return res.status(200).send({ investment })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

}

module.exports = new InvestmentListController()