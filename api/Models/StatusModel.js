const { DataTypes } = require('sequelize')
const config = require('../../config')
const Manga = require('./MangaModel')
const User = require('./UserModel')
const Follow = require('./followModel')

const Status = config.sequelize.define('status', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

  },
  Name: {
    type: DataTypes.STRING,
  }
  
}
)

// Status.belongsToMany(Manga, {through:"follow"})
// Manga.belongsToMany(Status, {through: "follow"})

// Status.belongsToMany(User, {through:"follow"})
// User.belongsToMany(Status, {through:"follow"})

User.belongsToMany(Manga, {through: Follow})
Manga.belongsToMany(User, {through: Follow})

Follow.belongsTo(User)
Follow.belongsTo(Status)

User.hasMany(Follow)
Status.hasMany(Follow)





Status.sync().then(
  ()=>{
    Status.findOrCreate({
      where:{
        Name:"Already read"
      },
      defaults:{
        Name:"Already read"
      }
    })
    Status.findOrCreate({
      where:{
        Name:"In progress"
      },
      defaults:{
        Name:"In progress"
      }
    })
    Status.findOrCreate({
      where:{
        Name:"To read"
      },
      defaults:{
        Name:"To read"
      }
    })
  }
)

module.exports = Status