const express = require('express')
const router = express.Router()
const db = require('../config/db')
const books = require('../models/Books')
const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize')

router.get('/', async(req, res) => {
    try {
        const result = await db.query('SELECT * FROM book.books', {
            type: QueryTypes.SELECT
        })
        res.json(result)
    }
    catch(e) {console.log(e)}
})

router.get('/add', async(req,res) => {
  await db.query('INSERT INTO book.books (name, description) VALUES (?, ?);',{
        replacements: [`dsfsfsdf`, `«Артемис Фаул» — серия фэнтези-романов ирландского писателя Йона Колфера про гениального мальчика Артемиса Фаула и волшебного народца`],
        type: QueryTypes.INSERT
    })
    console.log(req.url)
    res.redirect('/books')
})

router.get('/delete', async (req,res) => {
   await db.query('DELETE FROM book.books WHERE release_date is NULL')
    res.sendStatus(200)
})




module.exports = router