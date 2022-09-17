import React from 'react'
import Logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import Search from './Search'
import Menu from './Menu'
import { useLocation } from 'react-router-dom'


const Header = () => {
   const location = useLocation()
   const isActive = () => {
      const path = location.pathname.substring(1, location.pathname.lastIndexOf('/') === 0 ? location.pathname.length : location.pathname.lastIndexOf('/'))
      if (path === 'profile' || path === 'upload') {
         return ''
      } else return 'container set_width'
   }
   return (
      <div className='header'>
         <nav className={`${isActive()} navbar-light d-flex justify-content-between align-items-center`} style={{
            position: 'sticky', top: 0, left: 0, zIndex: 9, background: '#ffffff !important',
         }}>
            <Link to="/" className="navbar-brand logo ml-2">
               <img src={Logo} className='w-100 h-100' alt="Logo" />
            </Link>
            <Search />
            <Menu />
         </nav>
      </div>
   )
}

export default Header