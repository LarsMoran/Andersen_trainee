import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/loader'
import { BookCard } from '../components/bookCard'

export const MainPage = () => {
  const { request, loading } = useHttp()
  const [books, setBooks] = useState('')
  const getBooks = useCallback(async () => {
    try {
      const data = await request('/books', 'GET', null)
      setBooks(data)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getBooks()
    
  }, [getBooks])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      {!loading && books && <BookCard books={books} />}
    </div>
  )
}
