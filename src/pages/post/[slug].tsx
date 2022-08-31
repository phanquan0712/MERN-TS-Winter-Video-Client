import React, { useState, useEffect, useRef } from 'react'
import { IParams, IPost } from '../../utils/Typescript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, InputChange } from '../../utils/Typescript'
import Loading from '../../components/alert/Loading'
import { getDetailPost, likePost, unLikePost } from '../../redux/actions/postActions'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PostHeader from '../../components/post/PostHeader'
import ListComment from '../../components/post/ListComment'
import InputComment from '../../components/post/InputComment'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useNavigate, useParams } from 'react-router-dom'

const PostDetail = () => {
   const { slug, page }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { auth, detailPost, homePost, profileUser } = useSelector((state: RootStore) => state)
   const [post, setPost] = useState<IPost>()
   const [isPlay, setIsPlay] = useState<boolean>(true)
   const [valueVolume, setValueVolume] = useState<number>(100)
   const [isMute, setIsMute] = useState<boolean>(false)
   const [capture, setCapture] = useState<string | File>()


   const videoRef = useRef<HTMLVideoElement>(null)
   useEffect(() => {
      if (!slug) return
      dispatch(getDetailPost(slug))
   }, [slug, dispatch])

   useEffect(() => {
      if (!detailPost) return
      setPost(detailPost)
      return () => {
         setPost(undefined as any)
         setIsPlay(true)
      }
   }, [detailPost])


   const handlePlayVideo = () => {
      if (!videoRef.current) return
      if (videoRef.current?.paused) {
         setIsPlay(true)
         videoRef.current.play()
      } else {
         setIsPlay(false)
         videoRef.current.pause()
      }
   }

   const handleWatchDiffrenceVideo = () => {
      const newListVideo = homePost.posts.filter(item => item._id !== post?._id)
      const newVideo = newListVideo[Math.floor(Math.random() * newListVideo.length)]
      if (!newVideo) return
      return navigate(`/post/${newVideo._id}`)
   }

   // useEffect(() => {
   //    const newListVideo = homePost.posts.filter(item => item._id !== post?._id)
   //    const newVideo = newListVideo[Math.floor(Math.random() * newListVideo.length)]
   //    window.addEventListener('wheel', handleWatchDiffrenceVideo)

   //    return () => window.removeEventListener('wheel',handleWatchDiffrenceVideo)
   // }, [homePost.posts])

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
         videoRef.current.volume = target.valueAsNumber / 100;
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

   const handleGoBack = () => {
      navigate(`/`)
   }



   if (!post) return <Loading />
   return (
      <div className='post_detail'>
         <div className='post_detail-left'>
            {
               post.video &&
               <video
                  style={{ 
                     background: post.cover_img ? `url(${post.cover_img}) center center / cover no-repeat` : ''
                  }}
                  autoPlay loop
                  onClick={handlePlayVideo}
                  ref={videoRef}
                  src={post.video}
                  className='w-100 h-100'
               />
            }
            {
               !isPlay &&
               <div className='play_pause_video' onClick={handlePlayVideo}  >
                  <PlayArrowIcon />
               </div>
            }
            <div className='close_video' onClick={handleGoBack}>
               <span>&times;</span>
            </div>
            <div className='arrow_video'>
               <div onClick={handleWatchDiffrenceVideo}>
                  <ExpandLessIcon />
               </div>

               <div onClick={handleWatchDiffrenceVideo}>
                  <ExpandMoreIcon />
               </div>
            </div>
            <div className='volume_video-detailPost'>
               {
                  isMute ?
                     <div className='volume_icon' onClick={handleMuteVideo}>
                        <VolumeOffIcon />
                     </div>
                     :
                     <div className='volume_icon' onClick={handleMuteVideo}>
                        <VolumeUpIcon />
                     </div>
               }
               <div className='volume_range'>
                  <input type="range" value={valueVolume} className='input_range' min="0" max="100" step="1"
                     onChange={handleChangeVolume}
                  />
               </div>
            </div>
         </div>
         <div className='post_detail-right'>
            {
               post &&
               <PostHeader post={post} />
            }
            <ListComment post={detailPost} />
            <InputComment post={detailPost} />
         </div>
      </div>
   )
}

export default PostDetail