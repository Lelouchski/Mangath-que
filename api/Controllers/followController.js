const Follow = require('../Models/followModel')
const { Op } = require('sequelize')


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
console.log(isExist);
        // si oui, 
        if (!isExist) {
            res.render('descriptionManga') // je renvoi vers la page
        }
        else {
            //sinon je crée dans la table follow le trio idmanga, iduser, idstatus de toread
            await Follow.create({
                mangaId : req.params.mangaId,
                userId : req.session.userId,
                statusId: 3
            }) 
            res.redirect('back')
        }

       
    }
    // ,
    // postInProgress: async (req, res) => {

    //     res.render('?')
    // },
    // postAlreadyRead: async (req, res) => {

    //     res.render('?')
    // },




}