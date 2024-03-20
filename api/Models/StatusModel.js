const { DataTypes } = require('sequelize')
const config = require('../../config')

const Status = config.sequelize.define('status', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    
  },
  alreadyRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false

  },
  readLater: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}
)









module.exports = Status