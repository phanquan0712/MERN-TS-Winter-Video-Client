import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../global/Avatar'
import AuthModal from '../auth/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { AUTH_MODAL } from '../../redux/types/authType'
import { logout } from '../../redux/actions/authActions'
import Notifycation from '../global/Notifycation'


const Menu = () => {
   const dispatch = useDispatch<any>()
   const { auth, authModal, notify } = useSelector((state: RootStore) => state)
   const divRef = useRef<HTMLDivElement>(null)
   const spanRef = useRef<HTMLSpanElement>(null)
   const isActive = (path: string) => {
      return 'active'
   }

   const navLink = [
      { label: 'Message', icon: 'near_me', to: '/message' },
   ]



   // Open modal notifycation
   const handleOpenNotify = (event: any) => {
      if(divRef && spanRef) {
         if(event.target === spanRef.current) {
            divRef.current?.classList.add('active')
         } 
      }
   }

   useEffect(() => {
      window.addEventListener('click', handleOpenNotify)
      return () => window.removeEventListener('click', handleOpenNotify)
   }, [handleOpenNotify])


   return (
      <div className="menu" id="navbarSupportedContent">
         <ul className="mr-auto d-flex align-items-center">
            <li className={`nav-item active upload`}>
               <Link
                  onClick={() => {
                     if (!auth.user || !auth.access_token) return dispatch({ type: AUTH_MODAL, payload: true })
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
                           <li style={{ transform: 'translateY(2px)' }} className={`nav-item ${isActive(item.to)}`} key={index}>
                              <Link className={`nav-link`} to={item.to} title={item.label} >
                                 <span className='material-icons'>{item.icon}</span>
                              </Link>
                           </li>
                        ))
                     }
                     <li className="postsition-relative notify_hover" style={{ transform: 'translateY(2px)' }}>
                        <span ref={spanRef} className='material-icons' style={{ cursor: 'pointer' }} title={'Notifycation'}>{'mail'}</span>
                        <Notifycation data={notify.data} />
                     </li>
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
                     onClick={() => dispatch({ type: AUTH_MODAL, payload: true })}
                  >
                     <button className='btn btn-danger'>Login</button>
                  </li>
            }
         </ul>
      </div>
   )
}

export default Menu