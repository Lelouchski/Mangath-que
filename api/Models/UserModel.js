const { Sequelize,DataTypes } = require('sequelize')
const config = require('../../config')
const bcrypt = require('bcrypt')

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
  }
},
  {
    hooks: {
      // Avant la création d'un utilisateur, hacher le mot de passe s'il est défini
      beforeCreate: (User) => {
        User.password = User.password && User.password !== "" ? bcrypt.hashSync(User.password, 10) : ""
      }
    }
  }

)

module.exports = User