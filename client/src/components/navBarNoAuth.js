import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBarNoAuth = () => {
  return (
    <nav>
      <div className='nav-wrapper blue darken-3' style={{ padding: '0 2rem' }}>
        <a href='/' className='brand-logo'>Книжный магазин</a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li><NavLink to='/auth'>Регистрация</NavLink></li>
          <li><NavLink to='/auth'>Логин</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
