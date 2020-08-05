const Sequelize = require('sequelize')
const db = require('../config/db')

module.exports = db.define('shops', {
    name: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    schema: 'book'
})

