const express = require('express') // Express est un framework web pour Node.js
const session = require('express-session') // Express-session est un middleware de gestion de session pour Express
const { engine, ExpressHandlebars } = require('express-handlebars') // Express-handlebars est un moteur de modèle pour Express
const router = require('./api/router') // Importation du routeur défini dans le fichier ./api/router.js
const app = express() // Création d'une nouvelle instance de l'application Express
const port = 5000 // Définition du port sur lequel le serveur écoutera
const path = require('path') // Module intégré pour gérer les chemins de fichiers et de répertoires
const Handlebars = require("handlebars") // Handlebars est un moteur de modèle JavaScript

app.engine('hbs', engine({
    extname: 'hbs'}))
    
app.set('view engine', 'hbs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(path.join(__dirname, 'assets/css')))

app.use('/js', express.static(path.join(__dirname, 'assets/js')))

app.use('/images', express.static(path.join(__dirname, 'assets/images')))


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at: https://127.0.0.1:${port}`) 
})