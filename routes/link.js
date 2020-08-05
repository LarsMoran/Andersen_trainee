const {Router} = require('express')
const db = require('../config/db')
const shortid = require('shortid')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const { QueryTypes } = require('sequelize')
const router = Router()

router.post('/generate', async (req, res) => {
    try{
        const baseURL = config.get('baseURL')
        const { linkFrom } = req.body
        const code = shortid.generate()
        const linkExists = await db.query(`SELECT * FROM users.link WHERE linkFrom = '${linkFrom}'`)

        if(linkExists) {
            res.json( { link: linkExists })
        }

        const linkTo = baseURL + '/t/' + code

        const link = await db.query('INSERT INTO users.link (code, linkTo, linkFrom, ownerId) VALUES (?,?,?,?)', {
            replacements: [code, linkTo, linkFrom, req.user.userId],
            type: QueryTypes.INSERT
        })

        res.status(201).json( {link} )
    }
    catch(e) {
        console.log(e)
    }

})

router.get('/', async (req,res) => {
    try{
       const links = await db.query('SELECT * FROM users.link')
       res.json(links)
    }
    catch(e) {
        console.log(e)
    }

})

router.get('/:id', async (req,res) => {
    try{
        const link = await db.query(`SELECT * FROM users.link WHERE ownerId = '${req.params.id}'`, {
            type: QueryTypes.SELECT
        })
        res.json(link)
    }
    catch(e) {
        console.log(e)
    }

})

module.exports = router