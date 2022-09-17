import React, { useCallback, useEffect, useRef, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { InputChange, IPost } from '../../utils/Typescript';
import { useNavigate } from 'react-router-dom';
import useElementOnScreen from '../home/useElementOnScreen';

interface IProps {
   src: string
   post: IPost
   isMute: boolean
   setIsMute: (value: boolean) => void
   valueVolume: number
   setValueVolume: (value: number) => void
}

const CustomVideo = ({ src, post, isMute, setIsMute, valueVolume, setValueVolume}: IProps) => {
   const navigate = useNavigate()
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlay, setIsPlay] = useState<boolean>(false)



   const handlePlayVideo = () => {
      if (videoRef.current) {
         if (videoRef.current.paused) {
            videoRef.current.play();
         } else {
            videoRef.current.pause();
         }
         setIsPlay(!isPlay);
      }
   }

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.volume = valueVolume / 100;
      }
   }, [valueVolume])

   const handleMuteVideo = () => {
      if (videoRef.current) {
         if (isMute) {
            videoRef.current.muted = false;
            setValueVolume(Math.floor(Math.random() * (100 - 1) + 1));
         } else {
            setValueVolume(0)
            videoRef.current.muted = true;
         }
         setIsMute(!isMute);
      }
   }

   const handleChangeVolume = (e: InputChange) => {
      if (videoRef.current) {
         const target = e.target as HTMLInputElement;
         videoRef.current.volume = +target.value / 100;
         setValueVolume(target.valueAsNumber);
         if (target.valueAsNumber === 0) {
            videoRef.current.muted = true;
            setIsMute(true);
         } else {
            videoRef.current.muted = false;
            setIsMute(false);
         }
      }
   }
   const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
   }
   const isVisibile = useElementOnScreen(options, videoRef)


   useEffect(() => {
         if (isVisibile) {
            if (!isPlay) {
               videoRef.current?.play();
               setIsPlay(true)
            }
         }
         else {
            if (isPlay) {
               videoRef.current?.pause();
               setIsPlay(false)
            }
         }
   }, [isVisibile])


   return (
      <div className='video_custom h-100 w-100'>
         <video muted={isMute ? true : false} loop id='custom_video' ref={videoRef} src={src} className='w-100 h-100'
            onClick={() => navigate(`/post/${post._id}`)}
         />
         <div className='video_custom_controls'>
            <div>
               {
                  isPlay ?
                     <div className='pause_video' onClick={handlePlayVideo}>
                        <PauseIcon />
                     </div>
                     :
                     <div className='play_video' onClick={handlePlayVideo}>
                        <PlayArrowIcon />
                     </div>
               }
               <div className='volume_video'>
                  {
                     isMute ?
                        <div onClick={handleMuteVideo}>
                           <VolumeOffIcon />
                        </div>
                        :
                        <div onClick={handleMuteVideo}>
                           <VolumeUpIcon />
                        </div>
                  }
                  <input type="range" value={valueVolume} className='slider_volume' min="0" max="100" step="1"
                     onChange={handleChangeVolume}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default CustomVideo