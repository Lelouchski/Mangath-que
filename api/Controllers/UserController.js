const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')

module.exports = {

    get: (req, res) => {
        res.render('Login')
    },
    userAccount: (req, res) => {
        res.render('Inscription')
    },

    post: async (req, res) => {

        
        await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        res.redirect('/') // Redirection vers la page d'accueil
    }
}

