import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListUserInNav from './ListUserInNav';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/Typescript';


const LeftSide = () => {
   const { auth, suggestionUser } = useSelector((state: RootStore) => state)
   const location = useLocation()
   const isActive = (path: string) => {
      if(location.pathname === path) {
         return 'active'
      }else return ''
   }

   const navLeftSide = [
      { label: 'For you', icon: HomeIcon, icon_active: HomeOutlinedIcon , path: '/' },
      { label: 'Following', icon: GroupIcon, icon_active: GroupOutlinedIcon , path: '/following' },
   ]
   return (
      <div className='left_side'>
         <div className="left_side-nav w-100">
            { 
               navLeftSide.map((item, index) => (
                  <Link to={item.path} key={index} className={`left_side-nav-item w-100 d-flex ${isActive(item.path)}`}>
                     {
                        isActive(item.path)  === 'active' ? <item.icon /> : <item.icon_active />
                     }
                     <span>{item.label}</span>
                  </Link>
               ))
            }
         </div>
         <ListUserInNav title='Suggestion accounts' listUser={suggestionUser} />
         <ListUserInNav  title='Following accounts' listUser={auth.user?.following} />
      </div>
   )
}

export default LeftSide