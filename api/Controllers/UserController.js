
const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt') // Importation du module bcrypt pour le hachage des mots de passe
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Follow = require('../Models/followModel')


module.exports = {

    get: (req, res) => {
        res.render('Login')
    },
    inscription: (req, res) => {
        res.render('Inscription')
    },
    

    postInscription: async (req, res) => {
        // je stock dans result le resultat des controle d'express validator
        const result = validationResult(req) // Validation des données de la requête
        console.log(result);
        // si j'ai eu des erreurs renvoyer par express validator
        if (!result.isEmpty()) {
            // on les affiches sur la page d'inscription
            res.render('Inscription', { 'errors': result.errors })
            // sinon
        } else {
            // je cherche si un utilisateur possede ses identifiants et je stock dans user
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email },
                    ]
                }
            });
            // Si l'utilisateur ou l'email ne sont pas disponibles
            if (user) {
                const errors = [{ msg: 'Ces identifiants existe déjà.' }];
                console.log(errors);
                // On affiche sur la page d'inscription
                res.render('Inscription', { errors });
                // sinon
            } else {
                // Si les mots de passe sont différents
                if (req.body.password !== req.body.confPassword) {
                    //on stock dans errors un message d'erreur a l'identique de result a la premiere etape 
                    const errors = [{ msg: 'Identifiants érronés.' }];
                    // On affiche sur la page d'inscription
                    res.render('Inscription', { errors });
                    // sinon
                } else {
                    // on crée l'utilisateur
                    try {
                        // Inscription
                        await User.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        });
                        res.redirect('/Login') // Redirection vers la page Login
                    } catch (err) {
                        // En cas d'erreur lors de l'inscription
                        // On affiche sur la page d'inscription

                        res.render('Inscription', { err });
                    }
                }
            }
        }
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

