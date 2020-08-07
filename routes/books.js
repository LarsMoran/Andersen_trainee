const express = require('express')
const router = express.Router()
const db = require('../config/db')
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

router.get('/:name', async(req, res) => {
    try {
        const name = req.body
        const result = await db.query(`SELECT * FROM book.books WHERE name='${name}'`, {
            type: QueryTypes.SELECT
        })
        res.json(result)
    }
    catch(e) {console.log(e)}
})

router.post('/add', async(req,res) => {
    try{
        let {name, description, release_date, prequel, sequel, img} = req.body

        const bookExists = await db.query(`SELECT * FROM book.books WHERE name='${name}'`, {
            type: QueryTypes.SELECT
        })
    
        console.log(bookExists)
    
        if(bookExists.length !== 0) {
            return res.status(400).json({ message: 'Такая книга уже есть в базе' })
        }
    
        if(!name || !description) {
            return res.status(400).json({ message: 'Заполните форму корректно' })
        }

        if(!img) {
            img = 'default.jpg'
        }

        if(!release_date) {
            release_date = '01.01.2100'
        }
    
        await db.query('INSERT INTO book.books (name, description, release_date, prequel, sequel, img) VALUES (?, ?, ?, ?, ?, ?);',{
            replacements: [name, description, release_date, prequel, sequel, img],
            type: QueryTypes.INSERT
        })
        
        return res.status(200).json({ message: 'Книга добавлена' })
    }
    catch(e){}
})

router.get('/delete', async (req,res) => {
   await db.query('DELETE FROM book.books WHERE release_date is NULL')
    res.sendStatus(200)
})




module.exports = router