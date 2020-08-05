import React from 'react'

export const BookCard = ({ books }) => {
    return (
        <div>
           {books.map(book => {
               return (
                <div className="col s12 m7" key={book.id}>
                <h2 className="header">{book.name}</h2>
                <div className="card horizontal">
                  <div className="card-image">
                    <img src={`img/${book.img}`} alt='Nothing' />
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
              </div>
               )
           })}
        </div>
    )
}