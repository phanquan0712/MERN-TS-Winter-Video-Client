import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListUserInNav from '../home/ListUserInNav';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/Typescript';
import Footer from './Footer';
import Logo from '../../images/logo.png'


interface IProps {
   onDisplay: boolean
   setOnDisplay: (onDisplay: boolean) => void
}

const NavSideBar = ({ onDisplay, setOnDisplay}: IProps) => {
   const { auth, suggestionUser } = useSelector((state: RootStore) => state)
   const location = useLocation()
   const divRef = useRef<HTMLDivElement>(null)
   const navRef = useRef<HTMLDivElement>(null)
   const isActive = (path: string) => {
      if (location.pathname === path) {
         return 'active'
      } else return ''
   }
   const navLeftSide = [
      { label: 'For you', icon: HomeIcon, icon_active: HomeOutlinedIcon, path: '/' },
      { label: 'Following', icon: GroupIcon, icon_active: GroupOutlinedIcon, path: '/following' },
   ]

   useEffect(() => {
      if(divRef.current) {
         divRef.current.addEventListener('click', (e) => {
            if(e.target === divRef.current) {
               setOnDisplay(false)
            }
         })
         return () => {
            divRef.current?.removeEventListener('click', () => {})
         }
      }
   }, [onDisplay, divRef.current])




   return (    
      <div className='overlay_side_bar'  ref={divRef}
      style={{ transform: onDisplay ? 'translateX(0)' : 'translateX(-100%)' }}>
         <nav ref={navRef} className='nav_side_bar'>
            <div className="logo_side_bar p-2 d-flex align-items-center">
               <div className='logo_side_bar-link'>
                  <img src={Logo} className='w-100 h-100' alt="Logo" />
               </div>
               <div className="col-md-2 nav_side_bar_logo-text">
                  <h2 className='px-0 mb-0'>Winter</h2>
               </div>
            </div>
            <div className="left_side-nav w-100">
               {
                  navLeftSide.map((item, index) => (
                     <Link to={item.path} key={index} className={`left_side-nav-item w-100 d-flex ${isActive(item.path)}`}>
                        {
                           isActive(item.path) === 'active' ? <item.icon /> : <item.icon_active />
                        }
                        <span className='responsive_text'>{item.label}</span>
                     </Link>
                  ))
               }
            </div>
            <ListUserInNav title='Following accounts' listUser={auth.user?.following.slice(0, 5)} />
            <Footer />
         </nav>
      </div>
   )
}

export default NavSideBar