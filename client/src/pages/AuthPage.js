import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'
export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, notification, request, cleanNotification} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    
    useEffect(() => {
        message(notification)
        cleanNotification()
    }, [notification, message, cleanNotification])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const formHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        console.log(form)
    }

    const registerHandler = async () => {
        try{
            const data = await request('/auth/register', 'POST', {...form})
            console.log(data)
        }
        catch(e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/auth/login', 'POST', {...form})
            auth.login(data.token, data.userEmail)
            console.log(data.userEmail)
        }
        catch(e){}
    }

    return (
    <div className="row">
        <div className="col s6 offset-s3">
            <h1>Книжный Магазин</h1>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Авторизация в магазине</span>
                    <div>
                        <div className="input-field">
                            <input placeholder="Введите Email"
                            id="email"
                            type="text"
                            name='email'
                            onChange={formHandler}
                            />
                            <label htmlFor="first_name">Email</label>
                        </div>  
                        <div className="input-field">
                            <input placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name='password'
                            onChange={formHandler}
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>  
                    </div>
                </div>
                <div className="card-action">
                    <button className='btn blue lighten-1'
                    style={{marginRight: 15}}
                    onClick={registerHandler}
                    disabled={loading}>
                        Регистрация
                    </button>
                    <button className='btn cyan accent-3'
                    onClick={loginHandler}
                    disabled={loading}>
                        Логин
                    </button>
                </div>
            </div>
        </div>
  </div>
    )
}