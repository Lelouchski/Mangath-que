const { DataTypes } = require('sequelize')
const config = require('../../config')


const Author = require('../Models/AuthorModel');

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
    kind: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
}
)



Author.hasOne(Manga)
Manga.belongsTo(Author)

module.exports = Manga