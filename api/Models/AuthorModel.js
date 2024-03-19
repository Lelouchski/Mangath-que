const { DataTypes } = require('sequelize')
const config = require('../../config')

const Author = config.sequelize.define('authors', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,


    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}
)

module.exports = Author