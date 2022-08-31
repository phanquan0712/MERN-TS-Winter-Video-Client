import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../global/Avatar'
import { IUser } from '../../utils/Typescript'
import FollowBtn from '../global/FollowBtn'
import CardPreviewUser from '../../components/card/CardPreviewUser'
import { useNavigate } from 'react-router-dom'
interface IProps {
   title: string
   listUser: IUser[]
}

const ListUserInNav = ({ title, listUser }: IProps) => {
   const linkRef = useRef<HTMLDivElement>(null)
   const [isOpen, setIsOpen] = useState<string>('')
   const navigate = useNavigate()


   return (
      <>
         {
            listUser && listUser.length > 0 &&
            <div className='list_user pb-2'>
               <h6 className='list_user_title mb-0'>{title}</h6>
               <div className='list_user_content'>
                  {
                     listUser.map((item) => (
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
                           <div className='list_user_item_info' style={{ pointerEvents: 'none' }}>
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
               <span style={{ color: 'crimson', paddingLeft: '8px', cursor: 'pointer' }}>
                  See all
               </span>
            </div>
         }
      </>
   )
}

export default ListUserInNav