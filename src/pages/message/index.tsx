import React from 'react'
import MessageContent from '../../components/message/MessageContent'
import Conversation from '../../components/message/Conversation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector } from 'react-redux'
import NotFound from '../../components/global/NotFound';
import { RootStore } from '../../utils/Typescript'

const Message = () => {
   const { auth } = useSelector((state: RootStore) => state)
   if(!auth) return <NotFound />
   return (
      <div className='message'>
         <div className={`${window.innerWidth > 768 ? 'container' : ''} h-100`}>
            <div className="message_box px-0 position-relative">
               <Conversation />
               {
                  window.innerWidth > 768 &&
                  <div className='chat_content' />
               }
               <div 
               className="go_back" 
               onClick={() => window.history.back()}
               >
                  <KeyboardBackspaceIcon />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Message