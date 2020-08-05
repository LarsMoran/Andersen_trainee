const express = require('express')
const router = express.Router()
const db = require('../config/db')
const config = require('config')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const { QueryTypes } = require('sequelize')

router.post('/register',
[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальна длина пароля 6 символов').isLength({min: 6})
],
 async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Ошибка в вводе данных'
            })
        }
        const {email, password} = req.body
        const emailIsTrue = await db.query(`SELECT email FROM users.user_data WHERE email='${email}'`, {
            type: QueryTypes.SELECT
        })

        if(emailIsTrue.length !== 0) {
           return res.status(400).json({ message: 'Такой email уже зарегистрирован' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await db.query('INSERT INTO users.user_data (email, password) VALUES (?, ?)', {
            replacements: [email.toLowerCase(), hashedPassword],
            type: QueryTypes.INSERT
        })
        return res.status(201).json({ message: 'Пользователь создан' })
        
    }
    catch(e) {
        console.log(e)
    }
})


router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
           
           const {email, password} = req.body

           const user = await db.query(`SELECT * FROM users.user_data WHERE email = '${email}'`, {
               type: QueryTypes.SELECT
           })
           
           const isMatch = await bcrypt.compare(password, user[0].password)

           if(user.length === 0 || !isMatch) {
                return res.status(400).json({ message: 'Неверный email или пароль' })
           }
           
           const token = jwt.sign(
               { userEmail: user[0].email },
               config.get('jwt'),
               { expiresIn: '1h' }
           )

           res.json({ token, userEmail: user[0].email, message: 'Логин успешен' })
            
        }
        catch(e) {
            console.log(e)
        }
})

module.exports = router