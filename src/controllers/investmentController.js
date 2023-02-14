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

    listFilterInvestiments = async (req, res) => {
        const { date_start = null, date_finished = null, user_find = null } = req.body

        let filter = {
            date_inicio: date_start != '' ? date_start : null,
            date_fim: date_finished != '' ? date_finished : null,
            id_user: user_find
        }

        typeof date_start == 'undefined' || date_start == '' || date_start == null && delete filter.date_start
        typeof date_finished == 'undefined' || date_finished == '' || date_finished == null && delete filter.date_finished

        //filtro data
        if (filter.date_inicio != undefined) {
            filter.date = {}
            let data_in = date_start.split('/')
            var date_start_filter = new Date(new Date(data_in[2], parseInt(data_in[1]) - 1, parseInt(data_in[0]), 0, 0, 0, 0));

            if (filter.date_fim != null) {
                let data_fim = date_finished.split('/')
                var d_fim = new Date(new Date(data_fim[2], parseInt(data_fim[1]) - 1, parseInt(data_fim[0]), 0, 0, 0, 0));

                filter.date = {
                    $gte: date_start_filter,
                    $lte: d_fim
                }
            }

        } else {
            if (filter.id_user != null) {
                filter.user = filter.id_user
            }
        }

        if (filter.id_user != null) {
            filter.user = filter.id_user
        }

        await InvestmentList.find(filter)
            .then(async doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }

}

module.exports = new InvestmentListController()