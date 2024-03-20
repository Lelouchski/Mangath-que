const { DataTypes } = require('sequelize')
const config = require('../../config')
const Author = require('../Models/AuthorModel')
const Kind = require('../Models/KindModel')


const Manga = config.sequelize.define('mangas', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    
    volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isVerified: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}
)
Author.hasOne(Manga)
Manga.belongsTo(Author)


Kind.hasOne(Manga)
Manga.belongsTo(Kind)


Manga.sync().then(
    () => {
        Manga.findOrCreate({
            where: {
                title: 'After God'
            },
            defaults: {
                title: 'After God',
                authorId: 1,
                kindId: 1,
                volume: '3',
                image_url: 'assets/images/1710767436127-906534582-after_god.webp',
                isVerified: 'true',
                description: "Depuis que le Japon a été envahi par les Dieux, des zones interdites ont été définies autour de ce qui était auparavant des zones résidentielles. Mais malgré les interdictions, certains persistent à vouloir rencontrer les Dieux et tous finissent par disparaître sans laisser de trace."

            }
        })
        Manga.findOrCreate({
            where: {
                title: 'One Piece'
            },
            defaults: {
                title: 'One Piece',
                authorId: 2,
                kindId: 1,
                volume: '140',
                image_url: 'assets/images/1710795625970-16864017-onepiece.webp',
                isVerified: 'true',
                description: 'Avant son exécution, le pirate légendaire Gold Roger lance une chasse au trésor sans précédent et stimule ainsi les pirates du monde entier. Luffy, transformé en homme élastique après avoir mangé un fruit du démon, rêve de devenir le roi des pirates et de trouver le mystérieux “One Piece”. L’ère des pirates bat son plein, Luffy au chapeau de paille et son équipage affronteront des ennemis hauts en couleurs et vivront des aventures rocambolesques !'
            }
        })
        Manga.findOrCreate({
            where: {
                title: 'Solo Leveling',
            },
            defaults: {
                title: 'Solo Leveling',
                authorId: 3,
                kindId: 3,
                volume: '12',
                image_url: 'assets/images/1710797939642-921768054-solo_leveling.webp',
                isVerified: 'true',
                description: "Ce qui ne vous tue pas vous rend plus fort ! Mais ce dicton ne s'applique pas au chasseur le plus faible de toute l’humanité, Jinwoo Sung. Après avoir été mortellement blessé lorsqu’il est tombé par hasard sur un double donjon caché, Jinwoo est miraculeusement rescapé. Au bord de la mort, il entrevoit une quête et saisit une opportunité qui lui permet dès lors de gagner en puissance très rapidement. À présent, il souhaite découvrir les secrets de ses pouvoirs et du donjon qui les a engendrés."
            }
        })
    }
)




module.exports = Manga