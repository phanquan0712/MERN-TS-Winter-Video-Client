import React, { useState, useEffect } from 'react'
import Avatar from '../global/Avatar'
import FollowBtn from '../global/FollowBtn'
import { IUser } from '../../utils/Typescript'
import { useNavigate } from 'react-router-dom'

interface IProps {
   user: IUser
   isOpen: string
}

const CardPreviewUser = ({ user, isOpen }: IProps) => {
   const [open, setOpen] = useState<boolean>(false)
   const navigate = useNavigate()
   useEffect(() => {
      if(isOpen === user._id) {
         const timer = setTimeout(() => {
            setOpen(true)
         }, 1000)
         return () => {
            clearTimeout(timer)
            setOpen(false)
         }
      }
   }, [isOpen, user])

   const handleNavigate = (id: string) => {
      navigate(`/profile/${id}`)
   }


   return (
      <>
         {
            open &&
            <div className='preview_user'>
               <div className='d-flex justify-content-between align-items-center'>
                  <div onClick={() => handleNavigate(user._id as string)} style={{ cursor: 'pointer'}}>
                     <Avatar src={user.avatar} size='betweenMediumAndBig' />
                  </div>
                  <div style={{ pointerEvents: 'auto'}}>
                     <FollowBtn user={user} />
                  </div>
               </div>
               <p onClick={() => handleNavigate(user._id as string)} style={{ fontWeight: 'bold', cursor: 'pointer'}} className='mt-2'>{user.winterId}</p>
               <p onClick={() => handleNavigate(user._id as string)} style={{ fontWeight: '500', cursor: 'pointer' }} className='mb-2'>{user.name}</p>
               <div className='d-flex justify-content-between align-items-center'>
                  <p>
                     <strong className='mr-1'>
                        {user.followers?.length > 0 ? user.followers.length : 0}
                     </strong>
                     <span>Follower</span>
                  </p>
                  <p>
                     <strong className='mr-1'>
                        {user.liked?.length > 0 ? user.liked.length : 0}
                     </strong>
                     <span>Liked</span>
                  </p>
               </div>
            </div>
         }
      </>
   )
}

export default CardPreviewUser