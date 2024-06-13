const { Sequelize } = require('sequelize')

// Définition des paramètres de connexion à la base de données
const sequelize = new Sequelize('mangatheque', 'root', 'Kick$omebitchies72', {
  host: 'localhost',
  dialect: 'mysql',
})

// Synchronisation du modèle avec la base de données
sequelize.sync()

const secretPassword = 'motdepasse'


module.exports = { sequelize, secretPassword }