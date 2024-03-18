const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const User = require('../Models/UserModel')
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')

module.exports = {

    mostPopular: (req, res) => {
        res.render('MostPopular')
    },
    newMangas:  async (req, res) => {
        const mangas = await Manga.findAll({ raw: true }) // Récupération de tous les mangas depuis la base de données
        res.render('NewsMangas', { mangas}) // Rendu de la vue addMangas avec la liste des mangas
      },

    addMangas: (req, res) => {
        res.render('addMangas')
    },

    kindOfMangas: async (req, res) => {
        const genre = req.params.genre

        try {
            const mangas = await Manga.findAll({ where: { genre } })

            res.json(mangas)
        } catch (error) {
            console.error('Error ', error)
            res.status(500).json({ error: ' Error' })
        }
    },

    list: async (req, res) => {
        const mangas = await Manga.findAll({ raw: true }) // Récupération de tous les mangas depuis la base de données
        res.render('listAddMangas', { mangas, layout: 'admin' })// Rendu de la vue listMangas avec la liste des utilisateurs
    },
    getProposition: (req, res) => {
        res.render('ProposeNewManga')
    },
    postProposition: async (req, res) => {
        const result = validationResult(req) // Validation des données de la requête
        const manga = await Manga.findOne({ 
            where: {
                title: req.body.title
            }
        })

        if (!result.isEmpty()) {
            // Rendu de la vue ProposeNewMangas avec les données saisies et les erreurs de validation
            res.render('ProposeNewMangas', { title, 'error': result.errors })

        } else { // Si aucune erreur de validation
            // Création d'un nouveau manga avec les données saisies
            Manga.create({
                title: req.body.title,
                author: req.body.author,
                kind: req.body.kind,
                volume: req.body.volume,

            })
            res.redirect('/') // Redirection vers la page d'accueil
        }
    }
}