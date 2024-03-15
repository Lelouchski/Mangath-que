const { Sequelize,DataTypes } = require('sequelize')
const config = require('../../config')

const Manga = config.sequelize.define('mangas', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    kind: {
        type: DataTypes.STRING, // Assurez-vous que le type correspond à l'ID du genre dans la table kind_of_mangas
        allowNull: false,
        references: {
            model: 'kinds', // Nom de la table référencée
            key: 'id', // Clé primaire de la table référencée
        },
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}
)

module.exports = Manga