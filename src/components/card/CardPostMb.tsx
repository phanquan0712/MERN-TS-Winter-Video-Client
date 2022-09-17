import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IPost, RootStore, IParams } from '../../utils/Typescript'
import Avatar from '../global/Avatar'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import MessageIcon from '@mui/icons-material/Message';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likePost, unLikePost } from '../../redux/actions/postActions'
import { AUTH_MODAL } from '../../redux/types/authType'
import { Link, useNavigate } from 'react-router-dom'
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import useElementOnScreen from '../home/useElementOnScreen';
import ListCommentMb from '../post/ListCommentMb';
import CustomVideo from '../global/CustomVideo'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { GET_DETAIL_POST, MDSR } from '../../redux/types/postType';
import { MDCM } from '../../redux/types/commentType';
import { useParams } from 'react-router-dom'
import FollowBtnMb from '../global/FollowBtnMb'
import { UPDATE_LIST_POST_PROFILE } from '../../redux/types/profileUser';
import ShareModal from '../global/ShareModal';

interface IProps {
   post: IPost
   children?: React.ReactNode
   pageName?: string
   navProifle?: string
}

const CardPostMb: React.FC<IProps> = ({ post, children, pageName, navProifle }) => {
   const { auth, socket, detailPost, mdCm, profileUser, mdSr } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const { page, slug }: IParams = useParams()
   const [isLike, setIsLike] = useState<boolean>(false)
   const [isPlay, setIsPlay] = useState<boolean>(false)
   const videoRef = useRef<HTMLVideoElement>(null);

   const handleLikePost = () => {
      if (!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      setIsLike(!isLike)
      if (!isLike) {
         if (page === 'profile') {
            let newUser = profileUser.users?.find(item => item._id === slug);
            if(newUser) {
               if(navProifle === 'Video') {
                  newUser = {
                     ...newUser,
                     videos: newUser.videos.map(item => item._id === post._id ? {...item, likes: [...item.likes, auth.user?._id as string]} : item)
                  }
               } else {
                  newUser = {
                     ...newUser,
                     liked: newUser.liked.map(item => item._id === post._id ? {...post, likes: [...post.likes, auth.user?._id as string]} : item)
                  }
               }
               dispatch({ type: UPDATE_LIST_POST_PROFILE, payload: newUser })
            }
         } else {
            dispatch(likePost(post, auth, socket))
         }
      } else {
         if(page === 'profile') {
            let newUser = profileUser.users?.find(item => item._id === slug);
            if(newUser) {
               if(navProifle === 'Video') {
                  newUser = {
                     ...newUser,
                     videos: newUser.videos.map(item => item._id === post._id ? {...item, likes: item.likes.filter(id => id !== auth.user?._id as string)} : item)
                  }
               } else {
                  newUser = {
                     ...newUser,
                     liked: newUser.liked.map(item => item._id === post._id ? {...post, likes: post.likes.filter(item => item !== auth.user?._id)} : item)
                  }
               }
               dispatch({ type: UPDATE_LIST_POST_PROFILE, payload: newUser })
            }
         } else {
            dispatch(unLikePost(post, auth))
         }
      }
   }

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

   const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
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

   useEffect(() => {
      if (auth && auth.user) {
         if(page === 'post') {
            if (detailPost.likes?.find(item => item === auth.user._id)) {
               setIsLike(true)
            }
         } else {
            if (post.likes?.find(item => item === auth.user._id)) {
               setIsLike(true)
            }
         }
      }
   }, [post.likes, auth, detailPost, page])


   const handleOpenModalComment = () => {
      dispatch({ type: MDCM, payload: true })
      dispatch({ type: GET_DETAIL_POST, payload: post })
   }

   const handleOpenModalShare = () => {
      dispatch({ type: MDSR, payload: true })
      dispatch({ type: GET_DETAIL_POST, payload: post })
   }

   return (
      <>
         <div className='card_post_mb upload_preview home'>
            {/* <video muted autoPlay loop src={post.video} ref={videoRef} className='w-100 h-100' style={{ backgroundColor: '#000000', objectFit: 'cover' }} /> */}
            <div className='video_custom h-100 w-100'>
               <video
                  loop id='custom_video' ref={videoRef}
                  src={post.video} className='w-100 h-100'
                  style={{ backgroundColor: '#000000', objectFit: 'cover' }}
                  onClick={handlePlayVideo}
               />
               {
                  !isPlay &&
                  <div className='play_pause_video' onClick={handlePlayVideo}  >
                     <PlayArrowIcon />
                  </div>
               }
            </div>
            <div className="right_bar">
               <div className="right_bar_content">
                  <Link to={`/profile/${post.user?._id}`}>
                     <Avatar src={post.user?.avatar} size='bigMD' />
                  </Link>
                  <FollowBtnMb user={post.user} />
               </div>
               <div className="card_post_video-actions">
                  <button className='btn' onClick={handleLikePost}>
                     <span className={`like_post_sp ${isLike ? 'active' : ''}`}>
                        {
                           isLike ?
                              <FavoriteIcon color='error' />
                              :
                              <FavoriteIcon />
                        }
                     </span>
                     <strong>{post.likes?.length}</strong>
                  </button>
                  <div>
                     <button className='btn' onClick={handleOpenModalComment}>
                        <span>
                           <MessageIcon />
                        </span>
                        <strong>{post.comments?.length}</strong>
                     </button>
                  </div>
                  <button className='btn' onClick={handleOpenModalShare}>
                     <span style={{ transform: 'rotateY(180deg)' }}>
                        <ReplyIcon />
                     </span>
                  </button>
               </div>
               <div className="album-container_mb">
                  <div>
                     <img src={post.user?.avatar} alt="" />
                  </div>
               </div>
            </div>
            <div className="info video_caption">
               <div className="username">@{auth.user?.name}</div>
               <div className="caption" >{post.note}</div>
               <div className="sound-container">
                  <AudiotrackIcon />
                  <div className='sound'>
                     <div className='sound-text'>
                        <p>
                           Original sound
                           -
                           <span>&nbsp;</span>
                           {auth.user?.name}
                           <span>&nbsp;</span>
                        </p>
                        <p>
                           Original sound
                           -
                           <span>&nbsp;</span>
                           {auth.user?.name}
                           <span>&nbsp;</span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {
               children &&
               <div className='loopback' onClick={() => window.history.back()}>
                  {children}
               </div>
            }
         </div>
         {
            page === 'post' ? detailPost && mdCm && <ListCommentMb post={detailPost} /> : ''
         }
         {
            page === 'post' ? detailPost && mdSr && 
            <ShareModal url={`${window.location.origin}/post/${post._id}`} /> : ''
         }
      </>
   )
}

export default CardPostMb