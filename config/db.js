const Sequelize = require('sequelize')

module.exports = bookShop = new Sequelize('bookshop', 'postgres', '199811', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
