const { Sequelize,DataTypes } = require('sequelize')
const config = require('../../config')

const Kind = config.sequelize.define('kinds', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  Shonen: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  Seinen: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  Seijin: {
    type: DataTypes.STRING,
    defaultValue: false
  },
  Josei: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Kowai: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}
)

module.exports = Kind