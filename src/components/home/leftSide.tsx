import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListUserInNav from './ListUserInNav';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/Typescript';

interface IProps {
   toggle?: boolean
}

const LeftSide = ({ toggle }: IProps) => {
   const { auth, suggestionUser } = useSelector((state: RootStore) => state)
   const location = useLocation()
   const divRef = useRef<HTMLDivElement>(null)
   const isActive = (path: string) => {
      if (location.pathname === path) {
         return 'active'
      } else return ''
   }

   const navLeftSide = [
      { label: 'For you', icon: HomeIcon, icon_active: HomeOutlinedIcon, path: '/' },
      { label: 'Following', icon: GroupIcon, icon_active: GroupOutlinedIcon, path: '/following' },
   ]

   // useEffect(() => {
   //    if(divRef.current) {
   //       if(window.innerWidth < 1080) {
   //          divRef.current.classList.add('responsive')
   //       } else {
   //          divRef.current.classList.remove('responsive')
   //       }
   //    }
   // }, [window.innerWidth, divRef.current])


   return (
      <div className='left_side' ref={divRef}>
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
         {
            toggle !== true && 
            < ListUserInNav title='Suggestion accounts' listUser={suggestionUser} />
         }
         <ListUserInNav title='Following accounts' listUser={auth.user?.following.slice(0, 5)} />
      </div>
   )
}

export default LeftSide