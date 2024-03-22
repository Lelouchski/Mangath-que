const { validationResult } = require('express-validator') // Importation de la fonction validationResult d'express-validator
const User = require('../Models/UserModel')
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')
const multer = require('multer')
const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const { log } = require('handlebars')




module.exports = {

    mostPopular: (req, res) => {
        res.render('MostPopular')
    },
    search: async (req, res) => {

        const mangas = await Manga.findAll({
            where: { title: { [Op.substring]: req.body.title } },
            attributes: ['title', 'kindId', 'authorId', 'image_url', 'description'],
            raw: true,
            include: [
                {
                    model: Author,
                },
                {
                    model: Kind,
                }
            ]
        })
        res.render('searchResult', { mangas })
    },
    goDescription: async (req, res) => {
        const mangas = await Manga.findByPk(req.params.id, {
            include: [
                {
                    model: Author,
                },
                {
                    model: Kind,
                }
            ], raw: true,
            nest: true
        })

        res.render('descriptionManga', { mangas })
    },

    newMangas: async (req, res) => {
        const mangas = await Manga.findAll({
            include: [
                {
                    model: Author,
                },
                {
                    model: Kind,
                }
            ], raw: true,
            nest: true
        })
        res.render('NewsMangas', { mangas }) // Rendu de la vue addMangas avec la liste des mangas   
        
    },
    getupdateManga: async (req, res) => {
        const manga = await Manga.findByPk(req.params.id, { raw: true })
        res.render('NewsMangas', { manga })
    },

    postUpdateManga: async (req, res) => {
        await Manga.update({ // Mise à jour des données de l'article avec les données de la requête
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/NewsMangas')
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
        // // je recupere le nom d'auteur 
        // const authorname = req.body.authorname
        // // si il n'es=xiste pas je le crée
        // authorname = await Author.findOrCreate({
        //     where: { name: authorname }
        // })
        // // je recupere le genre
        // // si il n'existe pas je le crée
        // const kindName = req.body.kindName
        // kindName = await Kind.findOrCreate({
        //     where: { Name: kindName }
        // })

        await Manga.create({
            title: req.body.title,
            authorId: req.body.authorId,//a remplacé pas authorID de l'auteur crée ou trouvé
            kindId: req.body.kindId,// /a remplacé pas kindID du kind crée ou trouvé
            volume: req.body.volume,
            description: req.body.description,
            image_url: req.file.path
        }
        )
        res.redirect('/NewsMangas') // Redirection vers la page 
    },

    kindOfMangas: async (req, res) => {
        try {
            const genre = req.params.genre;
            // Récupération de tous les mangas avec les informations sur l'auteur et le genre
            const mangas = await Manga.findAll({
                include: [
                    { model: Author },
                    { model: Kind, }
                ],
                where: {
                    '$Kind.Name$': genre // Utilisation de l'alias du modèle Kind pour filtrer par nom de genre
                },
                nest: true, raw: true // Pour récupérer les résultats sous forme de tableau JavaScript simple
            });
            console.log(mangas);
            // Rendu de la vue avec la liste des mangas
            res.render('KindOfMangas', { mangas });
        } catch (error) {
            console.error('Error ', error);
            res.status(500).json({ error: 'Error' });
        }
    },
    getListAddMangas: async (req, res) => {

        const mangas = await Manga.findAll({
            where: {
                isVerified: 0,
            },
            include: [
                { model: Author },
                { model: Kind }
            ],
            raw: true,
            nest: true
        })

        res.render('listAddMangas', { mangas, layout: 'admin' })
    },

    getProposition: (req, res) => {
        res.render('ProposeNewManga')
    },

    postProposition: async (req, res) => {

        await Manga.create({
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume,
            description: req.body.description,
            image_url: req.file.path,
        })

        res.redirect('/Account')

    },

    refuseMangaList: async (req, res) => {
        await Manga.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/listAddMangas') // Redirection vers la liste des mangas
    },
    acceptMangaList: async (req, res) => {
        await Manga.update(
            { isVerified: true },
            { where: { id: req.params.id } }
        )
        res.redirect('/NewsMangas')
    },

    getConfirmListAdd: async (req, res) => {

        const mangas = await Manga.findAll({
            where: {
                isVerified: 1
            },
            order: [['createdAt', 'DESC']], // Tri des commentaires par date de création décroissante
            include: [
                { model: Author },
                { model: Kind },
                { model: User }
            ],
            raw: true,
            nest: true
        })

        res.render('confirmListAdd', { mangas, layout: 'admin' })
    },
}
