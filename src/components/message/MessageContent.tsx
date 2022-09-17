import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IUser, RootStore } from '../../utils/Typescript'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Avatar from '../global/Avatar'
import InputMessage from './InputMessage'
import { IParams } from '../../utils/Typescript'
import MessageDisplay from './MessageDisplay'
import { getMessage } from '../../redux/actions/messageAction'
import DivLoading from '../card/DivLoading'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


interface IProps {
   load: boolean
   setLoad : (load: boolean) => void
}

const MessageContent = ({ load, setLoad }: IProps) => {
   const { auth, message } = useSelector((state: RootStore) => state)
   const { slug }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const [user, setUser] = useState<IUser>()
   const [page, setPage] = useState<number>(1)
   const refDisplay = useRef<HTMLDivElement>(null)
   const pageEnd = useRef<HTMLButtonElement>(null)

   useEffect(() => {
      const userMess = message.conversations.find(item => item._id === slug)
      if(userMess) setUser(userMess)
      return () => setUser({} as IUser)
   }, [message.conversations, slug])


   useEffect(() => {
      if (refDisplay.current) {
         // to last message
         refDisplay.current.scrollTop = refDisplay.current.scrollHeight
      }
   }, [refDisplay.current])

   useEffect(() => {
      const observer = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting) {
            if(message.totalMessage > 0) setPage(prev => prev + 1)
         }
      }, {
         threshold: 0.1
      })
      if (pageEnd.current) {
         observer.observe(pageEnd.current)
      }
   }, [setPage, pageEnd.current,  message.totalMessage])

   useEffect(() => {
      if(page > 1 && message.totalMessage > 14 && message.firstLoad2) {
         setLoad(true)
         dispatch(getMessage(slug as string, auth.access_token, page))
         setLoad(false)
      }
   }, [page, dispatch, auth.access_token, slug])

   return (
         <div className='chat_content'>
            {
               user &&
               <>
                  <div className="chat_content_header">
                  {
                     window.innerWidth < 768 &&
                     <div className='mr-2 arrow_back' style={{ width: '32px', height: '32px', color: '#000'}} 
                        onClick={() => navigate('/message')}
                     >
                        <NavigateBeforeIcon />
                     </div>
                     }
                     <Link to={`profile/${user?._id}`} className='mr-2'>
                        <Avatar src={user?.avatar} size='betweenMediumAndBig' />
                     </Link>
                     <Link to={`profile/${user?._id}`}>
                        <p className='mb-0' style={{ fontSize: '18px', fontWeight: '600' }}>{user?.name}</p>
                        <p className='mb-0' style={{ fontSize: '16px', fontWeight: '400' }}>{user?.winterId}</p>
                     </Link>
                  </div>
                  <div className="chat_content_body position-relative" ref={refDisplay}>
                     <button className='position-absolute' ref={pageEnd}
                        style={{ top: '-10px', opacity: 0 }}
                     >Load more</button>
                     {
                        load &&
                        <DivLoading />
                     }
                     {
                        message.messages &&
                        message.messages.length > 0 &&
                        message.messages.filter(item => 
                           (item.sender as IUser)?._id === slug && (item.recipient as IUser)?._id === auth.user?._id
                           || (item.sender as IUser)?._id === auth.user?._id && (item.recipient as IUser)?._id === slug
                           || item.sender as string === slug && item.recipient as string === auth.user?._id
                           || item.sender as string === auth.user?._id && item.recipient as string === slug
                           ).map((item) => (
                           <div key={item._id}>
                              {
                                 ((item.sender as IUser)?._id !== auth.user?._id && item.sender as string !== auth.user?._id) ?
                                    <div className='chat_row other_message'>
                                       <MessageDisplay msg={item} />
                                    </div>
                                    :
                                    <div className='chat_row you_message'>
                                       <MessageDisplay msg={item} />
                                    </div>
                              }
                           </div>
                        ))
                     }
                  </div>
                  <div className="chat_content_footer">
                     <InputMessage user={user} />
                  </div>
               </>
            }
         </div>
   )
}

export default MessageContent