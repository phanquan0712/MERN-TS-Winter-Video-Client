import React, { useEffect, useState } from 'react'
import MessageContent from '../../components/message/MessageContent'
import Conversation from '../../components/message/Conversation'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector, useDispatch } from 'react-redux'
import NotFound from '../../components/global/NotFound';
import { IParams, RootStore } from '../../utils/Typescript'
import { useParams } from 'react-router-dom';
import { getMessage } from '../../redux/actions/messageAction';

const Message = () => {
   const { auth, message } = useSelector((state: RootStore) => state)
   const [load, setLoad] = useState<boolean>(false)
   const { slug }: IParams = useParams()
   const dispatch = useDispatch<any>()
   useEffect(() => {
      if(slug && auth.access_token) {
         setLoad(true)
         dispatch(getMessage(slug, auth.access_token))
         setLoad(false)
      }
   }, [dispatch, slug, auth.access_token])

   if(!auth || !message.conversations.find(item => item._id === slug)) return <NotFound />
   return (
      <div className='message'>
         <div className={`${window.innerWidth > 768 ? 'container' : ''} h-100`}>
            <div className="message_box px-0 position-relative"
               
            >
               <Conversation />
               <MessageContent load={load} setLoad={setLoad} />
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