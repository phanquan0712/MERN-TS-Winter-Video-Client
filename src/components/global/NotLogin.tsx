import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import imgWinter from '../../images/img_winter.jpg'
import imgConversation from '../../images/img_conversation.webp'
import imgProfile from '../../images/img_prfile2.jpg'
import { AUTH_MODAL } from '../../redux/types/authType';

interface IProps {
   title: string
   img: string
   description: string
}

const NotLogin = ({ title, img, description}: IProps) => {
   const { auth, authModal } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()

   if(window.innerWidth > 768) return <></>
   return (
      <div className='no_login'>
         <h6 className='mb-0 no_login-title'>{title}</h6>
         <div className='no_login_content'>
            {
               img === 'add' && 
               <img src={imgWinter} title='Add Videos' />
            }
            {
               img === 'notify' &&
               <img src={imgConversation} title='Notifycation' />
            }
            {
               img === 'profile' &&
               <img src={imgProfile} title='Profile' />
            }
            <p className='mb-0 no_login_content-main'>{description}</p>
            <button className='btn no_login_content-btn mt-3'
               onClick={() => dispatch({ type: AUTH_MODAL, payload: true})}
            >Sign in</button>
         </div>
      </div>
   )
}

export default NotLogin