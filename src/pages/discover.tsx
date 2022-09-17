import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IUser, RootStore } from '../utils/Typescript'
import LockIcon from '@mui/icons-material/Lock';
import ListUserInNav from '../components/home/ListUserInNav';
import { getDiscoverUser } from '../redux/actions/userActions';

const Discover = () => {
   const { auth, suggestionUser, discoverUser } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const discoverNav = [
      'Users',
      'Sounds',
      'Hashtags',
   ]

   useEffect(() => {
      if(auth.access_token) {
         dispatch(getDiscoverUser(auth.access_token))
      } else {
         dispatch(getDiscoverUser())
      }
   }, [auth.access_token, dispatch])


   const isActive = (idx: number) => {
      if(idx === 0) return 'active'
      else return ''
   }
   
   return (
      <div className='discover'>
         <h4 className="discover_header">
            Discover
         </h4>
         <div className="discover_content">
            <div className='discover_container'>
               <div className="discover_content-nav">
                  {
                     discoverNav.map((item, index) => (
                        <div key={index} className={`discover_content-nav__item ${isActive(index)}`}>
                           <p className='mb-0 mr-2'>{item}</p>
                           {
                              index !== 0 &&
                              <div>
                                 <LockIcon />
                              </div>
                           }
                        </div>
                     ))
                  }
               </div>
               <span className='discover_border'></span>
            </div>
            {
               auth.user && auth.access_token ? 
               <ListUserInNav title='' listUser={discoverUser.users} />
               :
               <ListUserInNav title='' listUser={suggestionUser} />
            }
         </div>
      </div>
   )
}

export default Discover