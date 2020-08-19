const express = require('express')
const router = express.Router()
const db = require('../config/db')
const { QueryTypes } = require('sequelize')

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM book.books', {
      type: QueryTypes.SELECT
    })
    res.json(result)
  } catch (e) { console.log(e) }
})

router.get('/:name/:shop', async (req, res) => {
  try {
    const name = req.params.name
    const shop = req.params.shop
    if (shop === 'none') {
      const result = await db.query(`SELECT * FROM book.books WHERE name SIMILAR TO '%${name}%'`, {
        type: QueryTypes.SELECT
      })
      return res.json(result)
    }

    const result = await db.query(
            `SELECT books.name,
            books.id,
            books.description,
            books.prequel,
            books.sequel,
            books.img,
            book_filter.quantity
            FROM book.books
            RIGHT JOIN book.book_filter ON books.id=book_filter.book_id
            RIGHT JOIN book.shops ON book.shops.name=book_filter.shop_name
            WHERE books.name SIMILAR TO '%${name}%'
            AND book.shops.name = '${shop}'`, {
              type: QueryTypes.SELECT
            })

    res.json(result)
    
  } catch (e) { console.log(e) }
})

router.post('/add', function(req, res, next) {
  if(req.body.user === 'larsmoran@gmail.com') {
    return next()
  }
  return res.json({ message: 'У вас нет таких прав'})
} , async (req, res) => {
  try {
    let { name, description, release_date, prequel, sequel, img, shop, quantity } = req.body

    console.log(shop, quantity)

    const bookExists = await db.query(`SELECT * FROM book.books WHERE name='${name}'`, {
      type: QueryTypes.SELECT
    })

    if (bookExists.length !== 0) {
      if (shop && quantity) {

        const bookFilter = bookExists[0]

        const bookFilterExists = await db.query(
                     `SELECT * FROM book.book_filter 
                    WHERE shop_name = '${shop}' and book_id = ${bookFilter.id}`,
                     {
                       type: QueryTypes.SELECT
                     })

        if (bookFilterExists.length !== 0) {
          return res.status(400).json({ message: `Такая книга уже есть в магазине ${shop}` })
        }


        await db.query('INSERT INTO book.book_filter (book_id, quantity, shop_name) VALUES (?, ?, ?);', {
          replacements: [bookFilter.id, quantity, shop],
          type: QueryTypes.INSERT

        })

        return res.status(200).json({ message: `Книга добавлена в магазин ${shop}` })
      }
      return res.status(400).json({ message: 'Такая книга уже есть в базе' })
    }

    if (!name || !description) {
      return res.status(400).json({ message: 'Заполните форму корректно' })
    }

    if (!img) {
      img = 'default.jpg'
    }

    if (!release_date) {
      release_date = '01.01.2100'
    }

    await db.query('INSERT INTO book.books (name, description, release_date, prequel, sequel, img) VALUES (?, ?, ?, ?, ?, ?);', {
      replacements: [name, description, release_date, prequel, sequel, img],
      type: QueryTypes.INSERT
    })

    return res.status(200).json({ message: 'Книга добавлена в общую базу' })
  } catch (e) {}
})

router.delete('/delete', function(req, res, next) {
  console.log(req.body)
  if(req.body.user === 'larsmoran@gmail.com') {
    return next()
  }
  return res.json({ message: 'У вас нет таких прав'})
}, async (req, res) => {

  const name = req.body.name

  console.log(name)

  await db.query(`DELETE FROM book.books WHERE name = '${name}'`)
  res.json({ message: 'Книга удалена' })
})

module.exports = router
