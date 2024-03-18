const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt') // Importation du module bcrypt pour le hachage des mots de passe
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')

module.exports = {

    get: (req, res) => {
        res.render('Login')
    },
    inscription: (req, res) => {
        res.render('Inscription')
    },
    watchlist: (req, res) => {
        res.render('Watchlist')
    },


    postInscription: async (req, res) => {
        const result = validationResult(req) // Validation des données de la requête
        const user = await User.findOne({ // Recherche d'un utilisateur existant avec le même nom d'utilisateur ou email
            where: {
                [Op.or]: [
                    { password: req.body.password },
                    { email: req.body.email }
                ]
            }
        })

        if (!result.isEmpty()) {
            // Rendu de la vue Inscription avec les données saisies et les erreurs de validation
            res.render('Inscription', { email, username, password, 'errors': result.errors })

        } else { // Si aucune erreur de validation
            // Création d'un nouvel utilisateur avec les données saisies
            User.create({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            res.redirect('/Login') // Redirection vers la page Login
        }
    },
    account: (req, res) => {
        res.render('Account')
    },

    login: async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        // Recherche de l'utilisateur en fonction de l'email saisi
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) { // Si aucun utilisateur correspondant n'est trouvé
            res.render('Login', { 'error': 'Ce compte est introuvable' })
        } else { // Si un utilisateur correspondant est trouvé
            // Comparaison du mot de passe saisi avec le mot de passe haché de l'utilisateur en base de données
            bcrypt.compare(password, user.password, async (err, result) => {
                if (!result) { // Si les mots de passe ne correspondent pas
                    // Rendu de la vue login avec un message d'erreur
                    res.status(401).render('login', { 'error': 'Mot de passe incorrect' })
                } else { // Si les mots de passe correspondent
                    // Enregistrement de l'utilisateur dans la session
                    req.session.username = user.username
                    res.redirect('/Account')
                }
                if (user.isAdmin) { // Si l'utilisateur est un administrateur
                    req.session.isAdmin = true // Enregistrement de l'information dans la session
                }
                if (user.isModerator) { // Si l'utilisateur est un modérateur
                    req.session.isModerator = true // Enregistrement de l'information dans la session
                }
            })
        }
    },

    logout: (req, res) => {
        req.session.destroy() // Suppression de la session
        res.redirect('/') // Redirection vers la page d'accueil
    },


    list: async (req, res) => {
        const users = await User.findAll({ raw: true }) // Récupération de tous les utilisateurs depuis la base de données
        res.render('gestionUsers', { users, layout: 'admin' })// Rendu de la vue gestionUsers avec la liste des utilisateurs
    },
}