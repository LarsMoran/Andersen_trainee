import React, { useState, useEffect } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export const CreatePage = () => {
    const {loading, request, notification, cleanNotification} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        name: '',
        description: '',
        release_date: '',
        prequel: '',
        sequel: '',
        img: ''
    })
    const formHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        console.log(form)
    }

    const addBookHandler = async() => {
        try {
            await request('/books/add', 'POST', {...form})
        }catch(e){}
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(notification)
        cleanNotification()
    }, [notification, message, cleanNotification])

    return (
        <div className="row">
        <div className="col s6 offset-s3">
            <h1>Добавить книгу</h1>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Форма</span>
                    <div>
                        <div className="input-field">
                            <input placeholder="Введите название книги"
                            id="name"
                            type="text"
                            name='name'
                            onChange={formHandler}
                            />
                            <label htmlFor="name">Название</label>
                        </div>  
                        <div className="input-field">
                            <input placeholder="Введите описание"
                            id="description"
                            type="text"
                            name='description'
                            onChange={formHandler}
                            />
                            <label htmlFor="description">Описание</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Введите дату выпуска книги"
                            id="date"
                            type="date"
                            name='release_date'
                            onChange={formHandler}
                            />
                            <label htmlFor="date">Выпуск</label>
                        </div>  
                        <div className="input-field">
                            <input placeholder="Введите название сиквела"
                            id="sequel"
                            type="text"
                            name='sequel'
                            onChange={formHandler}
                            />
                            <label htmlFor="sequel">Сиквел</label>
                        </div>  
                        <div className="input-field">
                            <input placeholder="Введите название приквела"
                            id="prequel"
                            type="text"
                            name='prequel'
                            onChange={formHandler}
                            />
                            <label htmlFor="prequel">Приквел</label>
                        </div>  
                        <div className="input-field">
                            <input placeholder="Введите имя файла картинки с расширением(.png, .jpg)"
                            id="img"
                            type="text"
                            name='img'
                            onChange={formHandler}
                            />
                            <label htmlFor="img">Картинка</label>
                        </div>    
                    </div>
                </div>
                <div className="card-action">
                    <button className='btn blue accent-3'
                    disabled={loading}
                    onClick={addBookHandler}>
                        Добавить книгу
                    </button>
                </div>
            </div>
        </div>
  </div>
    )
}