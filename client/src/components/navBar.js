import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

export const NavBar = (isAdmin = false) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className='nav-wrapper blue darken-3' style={{ padding: '0 2rem' }}>
        <a href='/' className='brand-logo'>Книжный магазин</a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li><NavLink to='/search'>Поиск</NavLink></li>
          {isAdmin ? <li><NavLink to='/create'>Создать</NavLink></li> : null}
          <li><NavLink to='/links'>Ссылки</NavLink></li>
          <li><a href='/' onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
