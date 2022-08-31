import React from 'react'
import MessageContent from '../../components/message/MessageContent'
import Conversation from '../../components/message/Conversation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const Message = () => {
   return (
      <div className='message'>
         <div className='container h-100 '>
            <div className="message_box px-0 position-relative">
               <Conversation />
               <MessageContent />
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