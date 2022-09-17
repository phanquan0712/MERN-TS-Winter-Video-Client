import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../global/Avatar'
import { IUser, RootStore } from '../../utils/Typescript'
import FollowBtn from '../global/FollowBtn'
import CardPreviewUser from '../../components/card/CardPreviewUser'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {  getSuggestionUser } from '../../redux/actions/userActions'

interface IProps {
   title: string
   listUser: IUser[]
}

const ListUserInNav = ({ title, listUser }: IProps) => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const linkRef = useRef<HTMLDivElement>(null)
   const [isOpen, setIsOpen] = useState<string>('')
   const [loadMore, setLoadMore] = useState<boolean>(false)
   const navigate = useNavigate()


   const handleLoadMore = () => {
      if(title === 'Suggestion accounts') {
         dispatch(getSuggestionUser())
      } else {
         if(auth.access_token && auth.user) {
            setLoadMore(true)
         }
      }
   }

   return (
      <>
         {
            listUser && listUser.length > 0 &&
            <div className='list_user pb-2'>
               {
                  title !== '' && 
                  <h6 className='list_user_title mb-0 responsive_text'>{title}</h6>
               }
               <div className='list_user_content'>
                  {
                     (loadMore ? auth.user?.following : listUser).map((item) => (
                        <div ref={linkRef}
                           onMouseOver={() => {
                              if(item._id) return setIsOpen(item._id)
                           }}
                           onMouseOut={() => setIsOpen('') }
                           className='list_user_item d-flex align-items-center position-relative' key={item._id}>
                           <Link to={`/profile/${item._id}`}
                              style={{
                                 position: 'absolute',
                                 top: '0',
                                 left: '0',
                                 width: '100%',
                                 height: '100%',
                              }}
                           ></Link>
                           <Avatar src={item.avatar} size='medium' />
                           <div className='list_user_item_info responsive_text' style={{ pointerEvents: 'none' }}>
                              <h4 className='list_user_item_info_winterId'>{item.winterId}</h4>
                              <p className='list_user_item_info_name'>{item.name}</p>
                           </div>
                           {
                              title === 'Suggestion accounts' &&
                              <CardPreviewUser user={item}  isOpen={isOpen} />
                           }
                        </div>
                     ))
                  }
               </div>
               {
                  title !== '' && 
                     <span className='responsive_text' style={{ color: 'crimson', paddingLeft: '8px', cursor: 'pointer' }}
                        onClick={handleLoadMore}
                     >
                        See all
                     </span>
               }
            </div>
         }
      </>
   )
}

export default ListUserInNav