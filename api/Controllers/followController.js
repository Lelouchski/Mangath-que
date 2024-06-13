const Manga = require('../Models/MangaModel');
const Follow = require('../Models/followModel')
const { Op } = require('sequelize')
const multer = require('multer')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')




module.exports = {
    postToRead: async (req, res) => {
        //I search if in the follow table the id user and id manga exist 
        const isExist = await Follow.findAll({
            where: {
                [Op.and]:
                {
                    mangaId: req.params.mangaId,
                    userId: req.session.userId
                }
            }
        })
        // if no, 
        if (!isExist) {
            res.render('descriptionManga') // go on descriptionManga page
        }
        else {
            //else I create in the follow table the id manga , id user and id statuts toRead
            await Follow.create({
                mangaId: req.params.mangaId,
                userId: req.session.userId,
                statusId: 3
            })
            res.redirect('back')
        }


    },

    readlist: async (req, res) => {
        const toReadMangas = await Follow.findAll({
            where: {
                statusId: 3
            },
            include: [
                {
                    model: Manga,
                    include: [Author, Kind],
                }
            ], nest: true,
        })


        res.render('Readlist', { mangas: toReadMangas })

    }
    ,
    postAlreadyRead: async (req, res) => {
        //je recherche dans la table follow si l'id user et l'id manga existe. 
        const isExist = await Follow.findAll({
            where: {
                [Op.and]:
                {
                    mangaId: req.params.mangaId,
                    userId: req.session.userId
                }
            }
        })
        // si oui, 
        if (!isExist) {
            res.render('descriptionManga') // je renvoi vers la page
        }
        else {
            //sinon je crée dans la table follow le trio idmanga, iduser, idstatus de toread
            await Follow.create({
                mangaId: req.params.mangaId,
                userId: req.session.userId,
                statusId: 1
            })
            res.redirect('back')
        }
    },
    account: async (req, res) => {
        const inProgress = await Follow.findAll({
            where: {
                statusId: 2,
                userId: req.session.userId
            },

            include: [
                {
                    model: Manga,
                    include: [Author, Kind],
                }
            ], nest: true,
        })
        const alreadyRead = await Follow.findAll({
            where: {
                statusId: 1,
                userId: req.session.userId
            },
            include: [
                {
                    model: Manga,
                    include: [Author, Kind],
                }
            ], nest: true,
        })
        res.render('Account', { inProgress, alreadyRead })
    },


    postInProgress: async (req, res) => {
        //je recherche dans la table follow si l'id user et l'id manga existe. 
        const isExist = await Follow.findAll({
            where: {
                [Op.and]:
                {
                    mangaId: req.params.mangaId,
                    userId: req.session.userId
                }
            }
        })
        // si oui, 
        if (!isExist) {
            res.render('descriptionManga') // je renvoi vers la page
        }
        else {
            //sinon je crée dans la table follow le trio idmanga, iduser, idstatus de toread
            await Follow.create({
                mangaId: req.params.mangaId,
                userId: req.session.userId,
                statusId: 2
            })
            res.redirect('back')
        }
    },

    getAlreadyRead: async (req, res) => {
        const toReadMangas = await Follow.findAll({
            where: {
                statusId: 1,
                userId: req.session.userId
            },
            include: [
                {
                    model: Manga,
                    include: [Author, Kind],
                }
            ], nest: true,
        })


        res.render('alreadyRead', { mangas: toReadMangas })

    },

    // deleteAlreadyRead: async (req, res) => {

    //     await Follow.destroy({
    //             [Op.and]:
    //             {
    //                 mangaId: req.params.id,
    //                 userId: req.session.userId,
    //                 statusId: 1
    //             }
    //         })

    //         res.redirect('back')
       
    // }


}