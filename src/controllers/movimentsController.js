const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const express = require('express')
const Moviments = require('../models/MovimentsList')
const User = require('../models/User')
const CategoryList = require('../models/Category')

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

    findByIdUser = async (req, res) => {

        const { id } = req.params
        try {
            const moviments = await Moviments.find({ user: id })
            return res.status(200).send({ moviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    create = async (req, res) => {

        const { label, value, createdAt, type, createdBy, user, category } = req.body

        let matches = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(createdAt);
        if (matches == null) {
            return false;
        }
        let dia = matches[1];
        let mes = matches[2];
        let ano = matches[3];
        let data = `${ano}/${mes}/${dia}`;


        const moviments = new Moviments({
            label, value, createdAt: data, type, createdBy, user, category
        })

        try {
            await moviments.save()
            return res.status(201).send({ msg: 'Movimentação adicionada!', moviments })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params
            Moviments.findByIdAndDelete(id).exec()
            return res.status(201).send({ msg: 'Movimentação deletada!' })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    categoryFind = async (req, res) => {

        const { id } = req.params
        try {
            const categoryList = await CategoryList.find({ user: id })
            return res.status(200).send({ categoryList })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    createCategory = async (req, res) => {

        const { categoryName, user_id, color } = req.body

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const categoryList = new CategoryList({
            categoryName, user: user_id, color: randomColor(), value: 0
        })

        try {
            await categoryList.save()
            return res.status(201).send({ msg: 'Movimentação adicionada!', categoryList })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }


    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params
            CategoryList.findByIdAndDelete(id).exec()
            return res.status(201).send({ msg: 'Categoria deletada!' })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    }

    updateCategory = async (req, res) => {
        try {
            const { id } = req.params
            const { category, valueStatusCategory } = req.body

            const filter = { categoryName: category, user: id };
            const update = { value: valueStatusCategory };

            const categoryList = await CategoryList.findOneAndUpdate(filter, update)
            console.log(categoryList)
            res.send(200, { success: true })
        } catch (error) {
            console.log(error.data)
            return res.status(400).send({ msg: 'ocorreu um erro' })
        }
    };



    listFilterMoviments = async (req, res) => {
        const { date_start = null, date_finished = null, categorySelected = null, user_find = null } = req.body

        let filter = {
            date_inicio: date_start != '' ? date_start : null,
            date_fim: date_finished != '' ? date_finished : null,
            categorySelection: categorySelected != '' ? categorySelected : null,
            id_user: user_find
        }

        typeof date_start == 'undefined' || date_start == '' || date_start == null && delete filter.date_start
        typeof date_finished == 'undefined' || date_finished == '' || date_finished == null && delete filter.date_finished
        typeof categorySelected == 'undefined' || categorySelected == '' || categorySelected == null && delete filter.categorySelection

        //filtro data
        if (filter.date_inicio != undefined) {
            filter.createdAt = {}
            let data_in = date_start.split('/')
            var date_start_filter = new Date(new Date(data_in[2], parseInt(data_in[1]) - 1, parseInt(data_in[0]), 0, 0, 0, 0));

            if (filter.date_fim != null) {
                let data_fim = date_finished.split('/')
                var d_fim = new Date(new Date(data_fim[2], parseInt(data_fim[1]) - 1, parseInt(data_fim[0]), 0, 0, 0, 0));

                filter.createdAt = {
                    $gte: date_start_filter,
                    $lte: d_fim
                }
            }

        } else {
            if (filter.id_user != null) {
                filter.createdBy = filter.id_user
            }
        }

        if (filter.id_user != null) {
            filter.createdBy = filter.id_user
        }

        if (filter.categorySelection != null) {
            filter.category = filter.categorySelection
        }

        await Moviments.find(filter)
            .then(async doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }

}

module.exports = new ListMovimentsController()