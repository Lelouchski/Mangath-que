const express = require('express') 
const { engine, ExpressHandlebars } = require('express-handlebars') 
const router = require('./api/router') 
const app = express() 
const config = require('./config')
const port = 5000 
const path = require('path') 
const session = require('express-session') // Express-session est un middleware de gestion de session pour Express
const SequelizeStore = require("connect-session-sequelize")(session.Store) // Connect-session-sequelize est un connecteur de session pour Sequelize
const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment") // Handlebars.moment est un wrapper pour Handlebars pour formater les dates et heures
MomentHandler.registerHelpers(Handlebars) // Enregistrement des helpers Handlebars fournis par Handlebars.moment


app.engine('hbs', engine({
    extname: 'hbs'}))

app.set('view engine', 'hbs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(path.join(__dirname, 'assets/css')))

app.use('/js', express.static(path.join(__dirname, 'assets/js')))

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(session({
    secret: config.secretPassword, // Clé secrète utilisée pour signer les cookies de session
    resave: false, // Ne pas enregistrer la session si elle n'a pas été modifiée
    saveUninitialized: true, // Enregistrer la session même si elle est vide
    cookie: { secure: false, maxAge: 3600000 }, // Configuration des cookies de session
    store: new SequelizeStore({ db: config.sequelize }) // Utilisation de Sequelize pour stocker les sessions en base de données
}))

app.use('*', (req, res, next) => {
    if (req.session.username) { // Vérification si un utilisateur est connecté
        res.locals.username = req.session.username // Variable locale contenant le nom d'utilisateur
        if (req.session.isAdmin) { // Vérification si l'utilisateur est administrateur
            res.locals.isAdmin = req.session.isAdmin // Variable locale indiquant si l'utilisateur est administrateur
        }
        if (req.session.isModerator) { // Vérification si l'utilisateur est modérateru
            res.locals.isModerator = req.session.isModerator // Variable locale indiquant si l'utilisateur est modérateur
        }
    }
    next() // Appel de la fonction next pour passer au middleware suivant
})

app.use('/', router)

try {
    config.sequelize.authenticate()
    console.log('Connection has been established successfully.') 
} catch (error) {
    console.error('Unable to connect to the database:', error) 
}

app.listen(port, () => {
    console.log(`Example app listening at: http://127.0.0.1:${port}`) 
})