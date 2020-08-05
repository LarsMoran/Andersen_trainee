const Sequelize = require('sequelize')
const db = require('../config/db')

module.exports = db.define('books', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    release_date: {
        type: Sequelize.DATE
    },
    sequel: {
        type:  Sequelize.STRING
    },
    prequel: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    schema: 'book'
})

