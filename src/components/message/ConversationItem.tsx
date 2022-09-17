import React, { useState, useEffect, useRef } from 'react'
import { IMessage, IUserMess, RootStore, IParams } from '../../utils/Typescript'
import { useNavigate } from 'react-router-dom'
import Avatar from '../global/Avatar'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux'
import { deleteConversation } from '../../redux/actions/messageAction';
import { useParams } from 'react-router-dom';


interface IProps {
   conversation: IUserMess
}

const ConversationItem = ({ conversation }: IProps) => {
   const { auth, socket } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { slug }: IParams = useParams()
   const [isOption, setIsOption] = useState<boolean>(false)
   const divRef = useRef<HTMLDivElement>(null)
   const handleClose = () => {
      if (divRef.current) {
         divRef.current.classList.remove('active')
         setIsOption(false)
      }
   }


   const handleOption = () => {
      if (divRef.current) {
         divRef.current.classList.add('active')
         setIsOption(true)
      }
   }


   const handleDeleteConversation = () => {
      dispatch(deleteConversation(conversation, conversation.conversationId as string, auth.access_token, socket))
      // Reload page
      setIsOption(false)
      navigate('/message')
   }

   return (
      <div className={`conversation_list_item ${slug === conversation._id ? 'active' : ''}`}>
         <div className='item_info' onClick={() => navigate(`/message/${conversation._id}`)}>
            <Avatar src={conversation?.avatar} size='big' />
            <div className='text_info'>
               <p className='mb-0' style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>{conversation?.name}</p>
               <p className='mb-0' style={{ fontSize: '16px', fontWeight: '300', color: '#999' }}>{conversation?.text}</p>
            </div>
         </div>
         {
            conversation._id &&
            <>
               <div className='chat_options' ref={divRef}>
                  {
                     isOption ?
                        <div onClick={handleClose} >
                           <HighlightOffIcon />
                        </div>
                        :
                        <div onClick={handleOption} >
                           <svg style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1.4em" height="1.4em" data-e2e="more-action-icon" className="tiktok-11y7opj-StyledMoreActionIcon eii3f6d0"><path fill="#161823" fill-rule="evenodd" d="M4 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm10-2a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                        </div>
                  }
               </div>
               {
                  isOption &&
                  <ul className="options_mode">
                     <li className='options_mode_item' onClick={handleDeleteConversation}>
                        <DeleteOutlineIcon />
                        Delete
                     </li>
                  </ul>
               }
            </>
         }
      </div>
   )
}

export default ConversationItem