import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
   src: string
   id: string
}

const CardVideo = ({ src, id }: IProps) => {
   const videoRef = useRef<HTMLVideoElement>(null)
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
      navigate(`/post/${id}`)
   }

   return (
      <video
         muted
         onClick={handleNavigate}
         ref={videoRef}
         src={src}
         className='w-100 h-100 video_thumb' 
      />
   )
}

export default CardVideo