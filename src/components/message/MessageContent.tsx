import React from 'react'
import { useSelector} from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { Link } from 'react-router-dom'
import Avatar from '../global/Avatar'
import InputMessage from './InputMessage'

const MessageContent = () => {
   const { auth } = useSelector((state: RootStore) => state)
   return (
      <div className='chat_content'>
         <div className="chat_content_header">
            <Link to={`profile/${auth.user?._id}`} className='mr-2'>
               <Avatar src={auth.user?.avatar} size='betweenMediumAndBig' />
            </Link>
            <Link to={`profile/${auth.user?._id}`}>
               <p className='mb-0' style={{ fontSize: '18px', fontWeight: '600'}}>{auth.user?.name}</p>
               <p className='mb-0' style={{ fontSize: '16px', fontWeight: '400'}}>{auth.user?.winterId}</p>
            </Link>
         </div>
         <div className="chat_content_body">
      
         </div>
         <div className="chat_content_footer">
            <InputMessage />
         </div>
      </div>
   )
}

export default MessageContent