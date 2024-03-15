const { Op } = require("sequelize") // Importation de l'opérateur d'égalité Sequelize
const User = require('../Models/UserModel')
const Manga = require('../Models/MangaModel')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')
const Status = require('../Models/StatusModel')

module.exports = {

    mostPopular: (req, res) => {
        res.render('MostPopular')
    },
    kindOfMangas: async (req, res) => {
        const genre = req.params.genre
    
        try {
            const mangas = await Manga.findAll({ where: { genre } })
    
            res.json(mangas)
        } catch (error) {
            console.error('Error fetching mangas by genre:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}