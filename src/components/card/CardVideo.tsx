import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPost, IPostThumb, RootStore } from '../../utils/Typescript'
import FollowBtn from '../global/FollowBtn'
import Avatar from '../global/Avatar'
import { useSelector, useDispatch } from 'react-redux'

interface IProps {
   post: IPostThumb | IPost
   id: string
   page: string
}

const CardVideo = ({ post, id, page }: IProps) => {
   const videoRef = useRef<HTMLVideoElement>(null)
   const { auth } = useSelector((state: RootStore) => state)
   const navigate = useNavigate()
   useEffect(() => {
      if (videoRef.current) {
         // When hover video element then play this video
         videoRef.current.addEventListener('mouseover', () => {
            videoRef.current?.play()
         })
         // When leave video element then pause this video
         videoRef.current.addEventListener('mouseout', () => {
            videoRef.current?.pause()
         })
         // Clear event listener when unmount this component
         return () => {
            if (videoRef.current) {
               videoRef.current.removeEventListener('mouseover', () => {
                  videoRef.current?.play()
               })
               videoRef.current.removeEventListener('mouseout', () => {
                  videoRef.current?.pause()
               })
            }
         }
      }
   }, [videoRef.current])



   const handleNavigate = () => {
      if(window.innerWidth < 768) return;
      if(auth.access_token && auth.user) {
         return navigate(`/post/${id}`)
      } else {
         return navigate(`/profile/${(post as IPost).user?._id}`)
      }
   }

   return (
      <>
         {
            page === 'following' ?
            <div className='card_video_follow'>
               <video
                  muted
                  onClick={handleNavigate}
                  ref={videoRef}
                  src={post.video}
                  className='w-100 h-100 video_thumb'
               />
               <div className='card_video_info'>
                  <Avatar src={(post as IPost).user?.avatar} size='big' />
                  <h6>{(post as IPost).user?.name}</h6>
                  <p>{(post as IPost).user?.winterId}</p>
                  <FollowBtn user={(post as IPost).user} width='160px' color='danger' />
               </div>
            </div>
            :
               <video
                  muted
                  onClick={handleNavigate}
                  ref={videoRef}
                  src={post.video}
                  className='w-100 h-100 video_thumb'
               />
         }
      </>
   )
}

export default CardVideo