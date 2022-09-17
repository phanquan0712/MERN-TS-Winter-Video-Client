import React from 'react'
import { IMessage,  RootStore, IParams, IUserMess, IUser } from '../../utils/Typescript'
import { useSelector, useDispatch  } from 'react-redux'
import Avatar from '../global/Avatar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteConversation, deleteMessage } from '../../redux/actions/messageAction'
import { useParams, useNavigate } from 'react-router-dom'

interface IProps {
   msg: IMessage
}

const MessageDisplay = ({ msg }: IProps) => {
   const { auth, socket, message } = useSelector((state: RootStore) => state)
   const { slug }: IParams = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch<any>()
   const handleDeleteMessage = () => {
      if(message.messages.length === 1) {
         const conversation = message.conversations.find(conversation => conversation._id === slug)
         dispatch(deleteConversation(conversation as IUserMess, msg.conversation as string, auth.access_token, socket))
         return navigate('/message')
      } else {
         dispatch(deleteMessage(msg, auth.access_token, socket))
      }
   }

   return (
      <>
      <div className='chat_content_main'>
         {
            (msg.sender as IUser)?._id !== auth.user?._id && msg.sender as string !== auth.user?._id &&
            <div className="chat_title">
               <Avatar src={(msg.sender as IUser)?.avatar} size='small' />
            </div>
         }
         <div className="chat_body">
            <p className='mb-0'>{msg.text}</p>
               <div className="chat_time">
                  <small>
                     {(new Date(msg.createdAt ? msg.createdAt : new Date())).toLocaleString()}
                  </small>
               </div>
         </div>
         {
            auth.user?._id === (msg.sender as IUser)?._id && msg.sender === auth.user?._id &&
               <div className='ml-2 delete_message' style={{ marginTop: '5%' }} onClick={handleDeleteMessage}>
                  <DeleteOutlineIcon />
               </div>
         }
      </div>
      </>
   )
}

export default MessageDisplay