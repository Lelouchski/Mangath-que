const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const User = require('../Models/UserModel')
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')
const multer = require('multer')
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize



module.exports = {

    mostPopular: (req, res) => {
        res.render('MostPopular')
    },
    search: async (req, res) => {

        const mangas = await Manga.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.substring]: req.body.title } },
                    { kind: { [Op.substring]: req.body.kind } }
                ]

            },
            attributes: ['id', 'title', 'kind', 'author', 'volume', 'image_url'], 
            raw: true
        })
        res.render('NewsMangas', { mangas })
    },

    newMangas: async (req, res) => {
        const mangas = await Manga.findAll({ raw: true }) // Récupération de tous les mangas depuis la base de données
        res.render('NewsMangas', { mangas }) // Rendu de la vue addMangas avec la liste des mangas
    },
    updateManga: async (req, res) => {
        await Manga.update({ // Mise à jour des données de l'article avec les données de la requête
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume
        }, {
            where: {
                id: req.params.id // Condition de mise à jour basée sur l'ID de l'article
            }
        })
        res.redirect('/NewsManga') // Redirection vers la liste des articles
    },
    deleteMangas: async (req, res) => {
        await Manga.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/NewsMangas') // Redirection vers la liste des mangas
    },

    addMangas: (req, res) => {
        res.render('addMangas')
    },

    postAddMangas: async (req, res) => {

        await Manga.create({
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume,
            image_url: req.file.path

        })
        res.redirect('NewsMangas') // Redirection vers la page 

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
            res.redirect('NewsMangas') // Redirection vers la page d'accueil
        }
    }
}