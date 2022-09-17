import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/Typescript';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
const FooterContainer = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const location = useLocation()
   const isActive = (path: string) => {
      if(location.pathname === path) {
         return 'active'
      }else return ''
   }

   const navLeftSide = [
      { label: 'For you', icon: HomeIcon, icon_active: HomeOutlinedIcon , path: '/' },
      { label: 'Search', icon: SearchIcon, icon_active: SearchIcon, path: '/discover' },
      { label: 'Add', icon: AddBoxIcon, icon_active: AddBoxIcon, path: '/add' },
      { label: 'Notifycation', icon: MailIcon, icon_active: MailIcon, path: '/notifycation' },
      { label: 'Profile', icon: PersonIcon, icon_active: PersonIcon, path: `/profile/${auth.user?._id}` },
   ]
   return (
      <footer className='footer_container'>
            <div className="left_side-nav w-100">
            { 
               navLeftSide.map((item, index) => (
                  <Link to={item.path} key={index} className={`left_side-nav-item w-100 d-flex ${isActive(item.path)}`}>
                     {
                        isActive(item.path)  === 'active' ? <item.icon /> : <item.icon_active />
                     }
                  </Link>
               ))
            }
         </div>
      </footer>
   )
}

export default FooterContainer