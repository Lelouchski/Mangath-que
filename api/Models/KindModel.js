const { DataTypes } = require('sequelize')
const config = require('../../config')
const Manga = require('./MangaModel')



const Kind = config.sequelize.define('kinds', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}
)

module.exports = Kind