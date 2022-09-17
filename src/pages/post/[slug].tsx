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
import CardPostMb from '../../components/card/CardPostMb'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GET_DETAIL_POST } from '../../redux/types/postType'
import { getHomePost, getPostFollowing } from '../../redux/actions/postActions'
import { SET_SOUND } from '../../redux/types/soundType'

const PostDetail = () => {
   const { slug, page }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { auth, detailPost, homePost, profileUser, listPostName, followingPost, sound } = useSelector((state: RootStore) => state)
   const [post, setPost] = useState<IPost>()
   const [isPlay, setIsPlay] = useState<boolean>(true)
   const [valueVolume, setValueVolume] = useState<number>(100)
   const [isMute, setIsMute] = useState<boolean>(false)
   const [optionsArrow, setOptionsArrow] = useState<string>('normal')
   const [pageNb, setPageNb] = useState<number>(1) 


   const videoRef = useRef<HTMLVideoElement>(null)
   useEffect(() => {
      if (!slug) return
      dispatch(getDetailPost(slug))
   }, [slug, dispatch])

   useEffect(() => {
      if (!detailPost) return
      setPost(detailPost)
      return () => {
         setPost({} as IPost)
         setIsPlay(true)
      }
   }, [detailPost])



   useEffect(() => {
      let newListVideo: IPost[] = []
      if (listPostName.listPostName === 'following') {
         newListVideo = followingPost.posts
      } else if (!listPostName.listPostName) {
         newListVideo = homePost.posts
      } else if (listPostName.listPostName === 'profile') {
         if (listPostName.listPostSubName === 'Video') {
            if (profileUser.users?.find(item => item._id === listPostName.idUser)) {
               newListVideo = profileUser.users.find(item => item._id === listPostName.idUser)?.videos as IPost[] || []
            }
         } else {
            if (profileUser.users?.find(item => item._id === listPostName.idUser)) {
               newListVideo = profileUser.users.find(item => item._id === listPostName.idUser)?.liked as IPost[] || []
            }
         }
      }
      const index = newListVideo.findIndex(item => item._id === slug)
      if(index === 0) setOptionsArrow('start')
      else if(index === newListVideo.length - 1){
            setOptionsArrow('end')
         }
      else setOptionsArrow('normal')

      return () => {
         setOptionsArrow('normal')
         setPageNb(1)
      }
   }, [listPostName, followingPost.posts, homePost.posts, profileUser.users])


   useEffect(() => {
      if (pageNb > 1) {
         if(!listPostName.listPostName && homePost.total > 0) { 
            dispatch(getHomePost(pageNb))
         } else if(listPostName.listPostName === 'following' && followingPost.total > 0) {
            dispatch(getPostFollowing(auth.access_token, pageNb))
         }
      }
   }, [listPostName, dispatch, pageNb, homePost.total, followingPost.total])
   
      useEffect(() => {
         setValueVolume(sound.sound)
      }, [sound.sound])


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

   const handleWatchDiffrenceVideo = (operator: string) => {
      let newListVideo: IPost[] = []
      if (listPostName.listPostName === 'following') {
         newListVideo = followingPost.posts
      } else if (!listPostName.listPostName) {
         newListVideo = homePost.posts
      } else if (listPostName.listPostName === 'profile') {
         if (listPostName.listPostSubName === 'Video') {
            if (profileUser.users?.find(item => item._id === listPostName.idUser)) {
               newListVideo = profileUser.users.find(item => item._id === listPostName.idUser)?.videos as IPost[] || []
               console.log(newListVideo)
            }
         } else {
            if (profileUser.users?.find(item => item._id === listPostName.idUser)) {
               newListVideo = profileUser.users.find(item => item._id === listPostName.idUser)?.liked as IPost[] || []
            }
         }
      }
      const index = newListVideo.findIndex(item => item._id === slug)
      let newVideo: IPost = {} as IPost
      if (operator === 'prev') {
         if (index  === 0) return setOptionsArrow('start');
         newVideo = newListVideo[index - 1]
      } else {
         if (index === newListVideo.length - 1) {
            setPageNb(pageNb + 1)
            return setOptionsArrow('end')
         } else newVideo = newListVideo[index + 1]
      }
      setOptionsArrow('normal')
      if (!newVideo) return
      return navigate(`/post/${newVideo._id}`)
   }



   const handleMuteVideo = () => {
      if (videoRef.current) {
         if (sound.isSound) {
            videoRef.current.muted = false;
            dispatch({ type: SET_SOUND, payload: { isSound: false, sound: Math.floor(Math.random() * (100 - 1) + 1)  } })
            // setValueVolume(Math.floor(Math.random() * (100 - 1) + 1));
         } else {
            dispatch({ type: SET_SOUND, payload: { isSound: true, sound: 0  } })
            // setValueVolume(0)
            videoRef.current.muted = true;
         }
         // setIsMute(!isMute);
      }
   }

   const handleChangeVolume = (e: InputChange) => {
      if (videoRef.current) {
         const target = e.target as HTMLInputElement;
         videoRef.current.volume = target.valueAsNumber / 100;
         dispatch({ type: SET_SOUND, payload: { sound: target.valueAsNumber  } })
         setValueVolume(target.valueAsNumber);
         if (target.valueAsNumber === 0) {
            videoRef.current.muted = true;
            dispatch({ type: SET_SOUND, payload: { isSound: true } })
            // setIsMute(true);
         } else {
            videoRef.current.muted = false;
            dispatch({ type: SET_SOUND, payload: { isSound: false } })
            // setIsMute(false);
         }
      }
   }

   const handleGoBack = () => {
      dispatch({ type: GET_DETAIL_POST, payload: {} })
      if (listPostName.listPostName === 'following') {
         return navigate('/following')
      } else if (!listPostName.listPostName) {
         return navigate('/')
      } else if (listPostName.listPostName === 'profile') {
         return navigate(`/profile/${listPostName.idUser}`)
      }
      return navigate('/')
   }



   if (!post) return <Loading />
   return (
      <>
         {
            window.innerWidth > 768 ?
               <div className='post_detail'>
                  <div className='post_detail-left'>
                     {
                        post.cover_img &&
                        <div className='post_detail-left-cover'
                           style={{
                              background: `url(${post.cover_img}) center center / cover no-repeat`,
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              filter: 'blur(10px)',
                              zIndex: -1,
                           }}
                        >
                        </div>
                     }
                     {
                        post.video &&
                        <video
                           style={{
                              backgroundColor: post.cover_img ? '' : '#000'
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
                        <div style={{
                           opacity: optionsArrow === 'start' ? 0 : 1,
                           pointerEvents: optionsArrow === 'start' ? 'none' : 'all'
                        }} onClick={() => handleWatchDiffrenceVideo('prev')}>
                           <ExpandLessIcon />
                        </div>

                        <div style={{
                           opacity: optionsArrow === 'end' ? 0 : 1,
                           pointerEvents: optionsArrow === 'end' ? 'none' : 'all'
                        }} onClick={() => handleWatchDiffrenceVideo('next')}>
                           <ExpandMoreIcon />
                        </div>
                     </div>
                     <div className='volume_video-detailPost'>
                        {
                           sound.isSound ?
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
               :
               <CardPostMb post={post}>
                  <ArrowBackIosIcon />
               </CardPostMb>
         }
      </>
   )
}

export default PostDetail