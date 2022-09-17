import React, { useEffect, useState } from 'react'
import { IUser } from '../../utils/Typescript'
import { RootStore } from '../../utils/Typescript'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import { addConversation } from '../../redux/actions/messageAction'
import { AUTH_MODAL } from '../../redux/types/authType'
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface IProps {
   user: IUser
   color?: string
   width?: string
   inPost?: boolean
}

const FollowBtnMB = ({ user, color, width, inPost }: IProps) => {
   const [followed, setFollowed] = useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const { auth, profileUser, message, socket } = useSelector((state: RootStore) => state)
   useEffect(() => {
      if (auth.user && auth.user.following.find(item => item?._id === user?._id)) {
         setFollowed(true)
      }
      return () => setFollowed(false)
   }, [auth.user?.following, user])

   const hanleFollow = () => {
      if (auth.user && auth.access_token) {
         if(!followed) {
            setFollowed(true)
            dispatch(follow(user, auth, socket))
         } else {
            setFollowed(false)
            dispatch(unfollow(user, auth, socket))
         }
      } 
   }
   
   if(followed || auth.user?._id === user?._id || !auth.user || !auth.access_token) return <></>
   return (
      <div className='follow_mb' onClick={hanleFollow}>
         <AddCircleIcon />
      </div>
   )
}

export default FollowBtnMB