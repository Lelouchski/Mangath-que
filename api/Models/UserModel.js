const { DataTypes } = require('sequelize')
const config = require('../../config')

const User = config.sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }})

    module.exports = User