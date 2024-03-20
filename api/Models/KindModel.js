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


Kind.sync().then(
  () => {
    Kind.findOrCreate({
      where: {
          Name: 'Shonen',
      },
      defaults: {
          id: 1,
          Name: 'Shonen'
      }
  })
  Kind.findOrCreate({
      where: {
          Name: 'Seinen',
      },
      defaults: {
          id: 2,
          Name: 'Seinen'
      }
  })
  Kind.findOrCreate({
      where: {
          Name: 'Manhwa',
      },
      defaults: {
          id: 3,
          Name: 'Manhwa'
      }
  })
})

module.exports = Kind