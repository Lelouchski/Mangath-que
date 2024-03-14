const { Sequelize,DataTypes } = require('sequelize')
const config = require('../../config')

const Manga = config.sequelize.define('mangas', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    date: {
        date: DataTypes.DATE,
        allowNull: false,
    },
    volume: {
        volume: DataTypes.INTEGER,
        allowNull: false,
    }
}
)

module.exports = Manga