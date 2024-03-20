
const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt') // Importation du module bcrypt pour le hachage des mots de passe
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')
const Follow = require('../Models/followModel')


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
            res.status(401).render('Login', { 'error': 'Identifiant incorrect' })
        } else { // Si un utilisateur correspondant est trouvé
            // Comparaison du mot de passe saisi avec le mot de passe haché de l'utilisateur en base de données
            bcrypt.compare(password, user.password, async (err, result) => {
                if (!result) { // Si les mots de passe ne correspondent pas
                    // Rendu de la vue login avec un message d'erreur
                    res.status(401).render('Login', { 'error': 'Identifiant incorrect' })
                } else { // Si les mots de passe correspondent
                    // Enregistrement de l'utilisateur dans la session
                    req.session.username = user.username
                    req.session.userId = user.id
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
    updateUser: async (req, res) => {
        // Recherche de l'utilisateur à mettre à jour
        const user = await User.findByPk(req.params.id)

        // Mise à jour des rôles de l'utilisateur
        await user.update({
            isAdmin: req.body.isAdmin === 'on',
            isModerator: req.body.isModerator === 'on',
            isMember: req.body.isMember === 'on'

        })

        res.redirect('/gestionUsers')
    },

    // récupérer user à modifier
    getUpdate: async (req, res) => {
        const user = await User.findByPk(req.params.id, { raw: true })
        res.redirect('/Account')
    },

    postUpdate: async (req, res) => {
        const user = await User.findByPk(req.params.id, { raw: true })
        if (!req.body.oldPassword) {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (!result) {
                    res.redirect('back')
                } else {
                    await User.update({
                        email: req.body.email
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    res.redirect('/Account')
                }
            });
        } else {
            //comparer l'ancien MDP avec celui présent dans la BDD
            bcrypt.compare(req.body.oldPassword, user.password, async function (err, result) {
                if (!result) {
                    res.redirect('back')
                } else {
                    //si OK
                    //vérifier si le new MDP = newConfPass
                    if (req.body.newPassword !== req.body.confNewPassword) {
                        res.redirect('back')
                    } else {
                        //enregistrer le new MDP
                        await User.update({
                            password: req.body.newPassword
                        }, { where: { id: req.params.id }, individualHooks: true })
                        res.redirect('/Account')
                    }
                }
            })
        }
    },
    postUpdateEmail: async (req, res) => {
        const user = await User.findByPk(req.params.id, { raw: true });
    
        // Vérifier si le mot de passe est fourni
        if (!req.body.oldPassword) {
            return res.redirect('back');
        }
    
        // Comparer le mot de passe fourni avec celui stocké dans la base de données
        bcrypt.compare(req.body.oldPassword, user.password, async function (err, result) {
            if (!result) {
                // Rediriger en arrière si le mot de passe fourni est incorrect
                return res.redirect('back');
            } else {
                // Vérifier si les nouvelles adresses e-mail correspondent
                if (req.body.newEmail !== req.body.confirmNewEmail) {
                    // Rediriger en arrière si les adresses e-mail ne correspondent pas
                    return res.redirect('back');
                } else {
                    // Mettre à jour l'adresse e-mail de l'utilisateur
                    await User.update({
                        email: req.body.newEmail
                    }, {
                        where: {
                            id: req.params.id
                        }
                    });
    
                    // Rediriger vers la page du compte après la mise à jour réussie
                    return res.redirect('/Account');
                }
            }
        })
    }


}

