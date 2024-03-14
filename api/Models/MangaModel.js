const { Sequelize,DataTypes } = require('sequelize')
const config = require('../../config')

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
    }
}
)

module.exports = Manga