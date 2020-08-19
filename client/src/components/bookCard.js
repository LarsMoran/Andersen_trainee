import React, { useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const BookCard = ({ books }) => {
  const message = useMessage()
  const { loading, notification, request, cleanNotification } = useHttp()
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    message(notification)
    cleanNotification()
  }, [notification, message, cleanNotification])

  const deleteHandler = async (event) => {
    try {
      await request('/books/delete', 'DELETE', {name: event.target.name, user: userData.userEmail})
      window.location.reload(true)
    }
   catch(e) {}
  }

  return (
    <div>
      {books.map(book => {
        return (
          <div className='col s12 m7' key={book.id}>
              <h2 className='header'>{book.name}</h2>
              <button className='btn blue lighten-1' onClick={deleteHandler} name={book.name}>Удалить</button>
            <div className='card horizontal'>
              <div className='card-image'>
                <img src={`img/${book.img}`} alt='Nothing' style={{ width: '200px', height: '300px' }} />
              </div>
              <div className='card-stacked'>
                <div className='card-content'>
                  <p className='flow-text'>{book.description}</p>
                </div>
                <div className='card-action'>
                  <a href='/' className='blue-text'>Sequel: {book.sequel || 'None'}</a>
                  <a href='/' className='blue-text'>Prequel: {book.prequel || 'None'}</a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
