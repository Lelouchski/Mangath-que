const express = require('express') 
const session = require('express-session') 
const { engine, ExpressHandlebars } = require('express-handlebars') 
const SequelizeStore = require("connect-session-sequelize")(session.Store) 
const router = require('./api/router') 
const app = express() 
const port = 3000 
const path = require('path') 
const config = require('./config')
const Handlebars = require("handlebars") 
const MomentHandler = require("handlebars.moment") 
MomentHandler.registerHelpers(Handlebars) 

app.engine('hbs', engine({
    extname: 'hbs', 
    helpers: {
        ifCond: function(v1, v2, option){
            if (v1 === v2) {
                return option.fn(this)
            }
            return option.inverse(this) 
        }
    }
}))

app.set('view engine', 'hbs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(path.join(__dirname, 'assets/css')))

app.use('/js', express.static(path.join(__dirname, 'assets/js')))

app.use('/images', express.static(path.join(__dirname, 'assets/images')))

app.use(session({
    secret: config.secretPassword, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false, maxAge: 3600000 }, 
    store: new SequelizeStore({ db: config.sequelize }) 
}))

app.use('*', (req, res, next) => {
    if (req.session.username) { 
        res.locals.username = req.session.username 
        if (req.session.isAdmin) { // Vérification si l'utilisateur est administrateur
            res.locals.isAdmin = req.session.isAdmin // Variable locale indiquant si l'utilisateur est administrateur
        }
    }
    next() // Appel de la fonction next pour passer au middleware suivant
})

// Utilisation du routeur défini dans ./api/router pour gérer les routes
app.use('/', router)

// Vérification de la connexion à la base de données Sequelize
try {
    config.sequelize.authenticate()
    console.log('Connection has been established successfully.') // Affichage d'un message si la connexion réussit
} catch (error) {
    console.error('Unable to connect to the database:', error) // Affichage d'une erreur en cas d'échec de connexion
}

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening at: https://127.0.0.1:${port}`) // Affichage d'un message indiquant que le serveur est en écoute
})