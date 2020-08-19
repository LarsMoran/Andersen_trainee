const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('config')
const db = require('./config/db')
const books = require('./models/Books')
const shops = require('./models/Shops')


db.authenticate()
  .then(() => console.log('db connected'))
  .catch((e) => console.log(`db error ${e}`))

const app = express()

app.use(express.json({ extended: true }))

const PORT = config.get('port')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.use('/auth', require('./routes/auth'))

app.use('/books', require('./routes/books'))

// app.use('/links', require('./routes/link'))

app.listen(PORT, (req, res) => console.log('Server has been started'))
