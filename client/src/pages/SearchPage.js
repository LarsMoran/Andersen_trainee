import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/loader'
export const SearchPage = () => {

    const { request, loading } = useHttp()
    const [book, setBook] = useState([])
    const [name, setName] = useState('')
    const getBook = useCallback(async (event) => {
        try {
            event.preventDefault()
           const data = await request(`/books/:${name}`, 'GET', null)
            setBook(data)
        }catch(e){}
        
    }, [request])
    
    useEffect(() => {
        getBook()
    }, [getBook])

    if(loading) {
        return <Loader />
    }
    return (
        <div className="row">
            <form className="col s12" style={{marginTop: '2%'}}>
            <div className="row">
                <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label htmlFor="textarea1">Введите название книги...</label>
                </div>
            </div>
            <button onClick={getBook}></button>
            </form>
            {book.map(book => {
                return(<div className="col s12 m7" key={book.id}>
                <h2 className="header">{book.name}</h2>
                <div className="card horizontal">
                  <div className="card-image">
                    <img src={`img/${book.img}`} alt='Nothing' style={{width: '200px', height: '300px'}}/>
                  </div>
                  <div className="card-stacked">
                    <div className="card-content">
                      <p className='flow-text'>{book.description}</p>
                    </div>
                    <div className="card-action">
                        <a href='/' className='blue-text'>Sequel: { book.sequel||'None' }</a>
                        <a href='/' className='blue-text'>Prequel: { book.prequel||'None' }</a>
                    </div>
                  </div>
                </div>
              </div>)
            })}
        </div>
    )
}