import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../global/Avatar'
import AuthModal from '../auth/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { AUTH_MODAL } from '../../redux/types/authType'
import { logout } from '../../redux/actions/authActions'

const Menu = () => {
   const dispatch = useDispatch<any>()
   const { auth, authModal } = useSelector((state: RootStore) => state)

   const isActive = (path: string) => {
      return 'active'
   }

   const navLink = [
      { label: 'Message', icon: 'near_me', to: '/message' },
      { label: 'Notifycation', icon: 'mail', to: '/notifycation' },
   ]


   return (
      <div className="menu" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto d-flex align-items-center" style={{ gap: '15px' }}>
            <li className={`nav-item active upload`}>
               <Link 
                  onClick={() => {
                     if(!auth.user || !auth.access_token) return dispatch({ type: AUTH_MODAL, payload: true })
                  }}
               className={`nav-link d-flex align-items-center border`} to={(auth.user && auth.access_token) ? '/upload' : '#'} >
                  <span className='material-icons mr-2'>add</span>
                  <span>Upload</span>
               </Link>
            </li>
            {
               auth.user && auth.access_token ?
                  <>
                     {
                        navLink.map((item, index) => (
                           <li style={{ transform: 'translateY(2px)' }} className={`nav-item ${isActive(item.to)}`} key={index} title={item.label}>
                              <Link className={`nav-link`} to={item.to} >
                                 <span className='material-icons'>{item.icon}</span>
                              </Link>
                           </li>
                        ))
                     }
                     <li className="nav-item dropdown mb-1"
                     >
                        <span className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown">
                           <Avatar src={auth.user.avatar} size='medium' />
                        </span>
                        <div className="dropdown-menu dropdown_profile" aria-labelledby="navbarDropdown"
                        >
                           <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
                           <label className="dropdown-item" htmlFor='theme'
                              style={{ cursor: 'pointer' }}
                           >
                           </label>
                           <div className="dropdown-divider"></div>
                           <span className="dropdown-item"
                              style={{ cursor: 'pointer' }}
                              onClick={() => dispatch(logout(auth))}
                           >Logout</span>
                        </div>
                     </li>
                  </>
                  :
                  <li className={`nav-item active`}
                     onClick={() => dispatch({ type: AUTH_MODAL, payload: true})}
                  >
                     <button className='btn btn-danger'>Login</button>
                  </li>
            }

         </ul>
      </div>
   )
}

export default Menu