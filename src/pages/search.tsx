import React, { useState, useEffect } from 'react'
import LeftSide from '../components/home/leftSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/Typescript'
import Avatar from '../components/global/Avatar'
import PostThumb from '../components/profile/PostThumb'
import { useLocation, useNavigate  } from 'react-router-dom'
import { searchPost } from '../redux/actions/postActions'
import { searchUser } from '../redux/actions/userActions'
import { SEARCH_POST } from '../redux/types/postType'
import { SEARCH_USER } from '../redux/types/profileUser'


const Search = () => {
   const NavSearch = [
      'Accounts',
      'Videos'
   ]
   const [active, setActive] = useState<string>(NavSearch[0])
   const { auth, searchData } = useSelector((state: RootStore) => state)
   const location = useLocation()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()

   useEffect(() => {
      if(location.search) {
         dispatch(searchPost(location.search.slice(3)))
         dispatch(searchUser(location.search.slice(3), auth.access_token))
      }
      return () => {
         dispatch({ type: SEARCH_USER, payload: [] })
         dispatch({ type: SEARCH_POST, payload: [] })
      }
   }, [location.search, dispatch, auth.access_token])


   return (
      <div className='home d-flex justify-content-between mx-auto' style={{ marginTop: '70px' }}>
         {
            window.innerWidth > 768 &&
            <div className='interface_responsive'>
               <LeftSide />
            </div>
         }
         <div className="main_container">
            <div className='profile_user_list_post-nav w-100 position-relative'
               style={{ display: "flex", justifyContent: "start", borderBottom: '1px solid #f6f6f6' }}
            >
               {
                  NavSearch.map((item, index) => (
                     <div className='py-2 profile_nav_item' key={index} style={{
                        width: '200px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        // borderBottom: '1px solid #ccc',
                        fontWeight: 'bold',
                        color: item === active ? '#333' : '#999',
                        transition: 'all .3s ease-in-out'
                     }}
                        onClick={() => setActive(item)}
                     >
                        {item}
                     </div>
                  ))
               }
               <div className={`position-absolute profile_nav_border ${active}`} style={{
                  background: '#000',
                  width: '200px',
                  height: '2px',
                  left: 0,
                  bottom: 0,
                  transform: active === 'Videos' ? 'translateX(200px)' : 'translateX(0px)',
                  transition: 'transform 0.2s ease',
               }}>
               </div>
            </div>
            {
               active === 'Accounts' &&
               <div className="main_container_content-accounts">
                  {
                     (searchData.users.filter(item => item._id !== auth.user?._id)) && (searchData.users.filter(item => item._id !== auth.user?._id)).length > 0 &&
                     (searchData.users.filter(item => item._id !== auth.user?._id)).map((item, index) => (
                        <div className="main_container_content-accounts_item" key={index} onClick={() => navigate(`/profile/${item._id}`)}>
                           <Avatar src={item.avatar} size='search' />
                           <div className='main_container_content-accounts-info'>
                              <h6 className='mb-0'>{item.name}</h6>
                              <div>
                                 <span>{item.winterId}</span>
                                 &nbsp;·&nbsp;
                                 <span>
                                    <strong>
                                       {item.followers?.length}  
                                    </strong>
                                    &nbsp;Follower</span>
                              </div>
                              {
                                 item.story !== 'No story' && <p className='mb-0'>{item.story}</p>
                              }
                           </div>
                        </div>
                     ))
                  }
               </div>
            }
            {
               active === 'Videos' &&
               <div className="main_container_content-videos">
                  {
                     searchData.posts && searchData.posts.length > 0 &&
                     <PostThumb posts={searchData.posts} />
                  }
               </div>
            }
         </div>
      </div>
   )
}

export default Search