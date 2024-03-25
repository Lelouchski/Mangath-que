const Manga = require('../Models/MangaModel');
const Follow = require('../Models/followModel')
const { Op } = require('sequelize')
const multer = require('multer')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')




module.exports = {
    postToRead: async (req, res) => {
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
                statusId: 3
            })
            console.log(isExist);
            res.redirect('back')
        }


    },

    readlist: async (req, res) => {
        const toReadMangas = await Follow.findAll({
            where: {
                statusId : 3
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
    postAlreadyRead:async (req, res) => {
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
            console.log(isExist)
            res.redirect('back')
        }
    },
    account: async (req, res) => {
        const toReadMangas = await Follow.findAll({
            where: {
               statusId : 1 
            },
            
            include: [
              {
                model:Manga,
                include: [Author, Kind], 
                attributes: ['title', 'volume', 'image_url'],
              }
            ], nest: true,
        })
        res.render('Account', { mangas: toReadMangas })

    },


    // postAlreadyRead: async (req, res) => {

    //     res.render('?')
    // },




}