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
        console.log("isExist:", isExist)
                // si oui, 
        if (!isExist) {
            res.render('descriptionManga') // je renvoi vers la page
        }
        else {
            //sinon je crée dans la table follow le trio idmanga, iduser, idstatus de toread
            await Follow.create({
                mangaId: req.params.mangaId,
                userId: req.session.userId,
                statusId: 3,
            })
            console.log("New entry created in Follow table");

            res.redirect('back')
        }


    },

    readlist: async (req, res) => {
        const toReadMangas = await Follow.findAll({ where: {
            userId: req.session.userId
        },
            include: [
              {
                model: Manga,
                include: [Author, Kind], 
                attributes: ['title', 'volume', 'image_url'], 
              }
            ]
        })
        console.log("toReadMangas:", toReadMangas)
                res.render('Readlist', { mangas: toReadMangas })

    }
    // ,
    // postInProgress: async (req, res) => {

    //     res.render('?')
    // },
    // postAlreadyRead: async (req, res) => {

    //     res.render('?')
    // },




}