const { DataTypes } = require('sequelize')
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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isModerator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isMember: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
      },
      // Avant la mise à jour d'un utilisateur, hacher le mot de passe s'il est défini
      beforeUpdate: (User) => {
        User.password = User.password && User.password !== "" ? bcrypt.hashSync(User.password, 10) : ""
      }
    }
  }
)

User.sync().then(
  () => {
    User.findOrCreate({
      where: {
        email: 'admin@admin.fr'
      },
      defaults: {
        email: 'admin@admin.fr',
        username: 'admin',
        isVerified: 1,
        isAdmin: 1,
        isModerator: 0,
        isMember: 0,
        password: 'admin'
      }
    })
    User.findOrCreate({
      where: {
        email: 'modo1@modo.fr'
      },
      defaults: {
        email: 'modo1@modo.fr',
        username: 'modo1',
        isVerified: 1,
        isAdmin: 0,
        isModerator: 1,
        isMember: 0,
        password: 'modo1'
      }
    })
    User.findOrCreate({
      where: {
        email: 'user1@user.fr'
      },
      defaults: {
        email: 'user1@user.fr',
        username: 'user1',
        isVerified: 1,
        isAdmin: 0,
        isModerator: 0,
        isMember: 1,
        password: 'user1'
      }
    })
  })

module.exports = User