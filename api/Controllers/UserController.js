const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt') // Importation du module bcrypt pour le hachage des mots de passe

module.exports = {

    get: (req, res) => {
        res.render('Login')
    },
    inscription: (req, res) => {
        res.render('Inscription')
    },
    

    post: async (req, res) => {

        await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        console.log(req.session.username);
        res.redirect('/') // Redirection vers la page d'accueil
    },
    account : (req, res) => {
        res.render('Account')
    },
   
    login: async (req, res) => {
        // Recherche de l'utilisateur en fonction du nom d'utilisateur ou de l'email saisi
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { password: { [Op.substring]: req.body.password } },
                    { email: { [Op.substring]: req.body.email } }
                ]
            }
        })

        if (!user) { // Si aucun utilisateur correspondant n'est trouvé
            res.render('HomePage', { email, password, 'errors': result.errors })
        } else { // Si un utilisateur correspondant est trouvé
            // Comparaison du mot de passe saisi avec le mot de passe haché de l'utilisateur en base de données
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                if (!result) { // Si les mots de passe ne correspondent pas
                    // Rendu de la vue login avec un message d'erreur
                    res.status(401).render('login', { 'error': 'identifiant incorrect' })
                } else { // Si les mots de passe correspondent
                    // Enregistrement de l'utilisateur dans la session
                    req.session.username = user.username
                    // req.session.UserId = user.id
                    res.redirect('/Account') 
                }
            })
        }
    }
}



