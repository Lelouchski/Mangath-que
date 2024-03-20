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
            where: { title: { [Op.substring]: req.body.title } },
            attributes: ['id', 'title', 'kind', 'author', 'volume', 'image_url', 'description'],
            raw: true
        })
        res.render('descriptionManga', { mangas })
    },

    newMangas: async (req, res) => {

        try {
            // Récupération de tous les mangas avec les informations sur l'auteur et le genre
            const mangas = await Manga.findAll({
                include: [
                    { model: Author },
                    { model: Kind }
                ],
                nest:true, raw: true // Pour récupérer les résultats sous forme de tableau JavaScript simple
            });
            console.log(mangas); 
            // Rendu de la vue avec la liste des mangas
            res.render('NewsMangas', { mangas });
        } catch (error) {
            console.error('Error ', error);
            res.status(500).json({ error: 'Error' });
        }
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

        await Manga.create({
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume,
            description: req.body.description,
            image_url: req.file.path

        })
        res.redirect('NewsMangas') // Redirection vers la page 

    },

    kindOfMangas : async (req, res) => {
        try {
            const genre = req.params.genre;
            // Récupération de tous les mangas avec les informations sur l'auteur et le genre
            const mangas = await Manga.findAll({
                include: [
                    { model: Author },
                    { model: Kind,}
                ],
                where: {
                    '$kind.name$': genre // Utilisation de l'alias du modèle Kind pour filtrer par nom de genre
                },
                nest:true, raw: true // Pour récupérer les résultats sous forme de tableau JavaScript simple
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
            include: [{
                model: User,
                where: { isAdmin: false, isMember: true }
            }],
            raw: true

        })
        console.log(mangas)
        res.render('listAddMangas', { mangas, layout: 'admin' })

    },

    // postListAddMangas: async (req, res) => {
    //     const mangas = await Manga.findAll({
    //         include: [{
    //             model: User,
    //             where: { isAdmin: false }
    //         }],
    //         raw: true

    //     })

    //     res.render('Account', { mangas, layout: 'admin' })

    // },
    getProposition: (req, res) => {
        res.render('ProposeNewManga')
    },
    postProposition: async (req, res) => {

        await Manga.create({
            title: req.body.title,
            author: req.body.author,
            kind: req.body.kind,
            volume: req.body.volume,
            description: req.body.description
        })

        res.redirect('Account')

    }
}