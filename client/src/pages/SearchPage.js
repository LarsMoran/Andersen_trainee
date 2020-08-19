import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/loader'

export const SearchPage = () => {
  const { request, loading } = useHttp()
  const [book, setBook] = useState([])
  const [name, setName] = useState('')
  const [shop, setShop] = useState('none')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const nameHandler = (event) => {
    setName(event.target.value)
  }

  const getBook = async () => {
    try {
      const data = await request(`/books/${name}/${shop}`, 'GET', null)
      await setBook(data)
      console.log(book)
    } catch (e) {}
  }

  const selectHandler = event => {
    setShop(event.target.value)
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div className='row'>
      <div className='row'>
        <div className='input-field col s10'>
          <textarea id='textarea1' className='materialize-textarea' onChange={nameHandler} />
          <label htmlFor='textarea1'>Введите название книги...</label>
        </div>
        <button onClick={getBook} className='waves-effect waves-light btn' style={{ marginTop: '25px' }}>Поиск</button>
        <div className='input-field col s12'>
          <select className='browser-default' onChange={selectHandler} defaultValue=''>
            <option value='' disabled>Choose your option</option>
            <option value='BookShop1'>BookShop1</option>
            <option value='BookShop2'>BookShop2</option>
            <option value='BookShop3'>BookShop3</option>
          </select>
        </div>
      </div>

      {book.map(book => {
        return (<div className='col s12' key={book.id}>
          <h2 className='header'>{book.name}</h2>
          <div className='card horizontal'>
            <div className='card-image'>
              <img src={`img/${book.img}`} alt='Nothing' style={{ width: '200px', height: '300px' }} />
            </div>
            <div className='card-stacked'>
              <div className='card-content'>
                <p className='flow-text'>{book.description}</p>
                <p className='flow-text'>В наличии: {book.quantity || ' Есть'}</p>
              </div>
              <div className='card-action'>
                <a href='/' className='blue-text'>Sequel: {book.sequel || 'None'}</a>
                <a href='/' className='blue-text'>Prequel: {book.prequel || 'None'}</a>
              </div>
            </div>
          </div>
                </div>)
      })}
    </div>
  )
}
