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
    }
}
)

Author.sync().then(
    () => {
        Author.findOrCreate({
            where: {
                name: 'Eno Sumi',
            },
            defaults: {
                id: 1,
                name: 'Eno Sumi'
            }
        })
        Author.findOrCreate({
            where: {
                name: 'Eiichirō Oda',
            },
            defaults: {
                id: 2,
                name: 'Eiichirō Oda'
            }
        })
        Author.findOrCreate({
            where: {
                name: 'Chu-Gong',
            },
            defaults: {
                id: 3,
                name: 'Chu-Gong'
            }
        })
    })

module.exports = Author