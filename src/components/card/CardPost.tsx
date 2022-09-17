import React, { useEffect, useState } from 'react'
import { IPost } from '../../utils/Typescript'
import Avatar from '../global/Avatar'
import { Link } from 'react-router-dom'
import FollowBtn from '../global/FollowBtn'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import MessageIcon from '@mui/icons-material/Message';
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CustomVideo from '../global/CustomVideo'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { likePost, unLikePost } from '../../redux/actions/postActions'
import { AUTH_MODAL } from '../../redux/types/authType'
import CardPostMb from './CardPostMb'
import { useNavigate } from 'react-router-dom'
import ShareModal from '../global/ShareModal'

interface IProps {
   post: IPost
   isMute: boolean
   setIsMute: (value: boolean) => void
   valueVolume: number
   setValueVolume: (value: number) => void
   children?: React.ReactNode
}



const CardPost: React.FC<IProps> = ({ post, isMute, setIsMute, valueVolume, setValueVolume, children }) => {
   const { auth, socket } = useSelector((state: RootStore) => state)
   const [isLike, setIsLike] = useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()



   const handleLikePost = () => {
      if (!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      setIsLike(!isLike)
      if (!isLike) {
         dispatch(likePost(post, auth, socket))
      } else {
         dispatch(unLikePost(post, auth))
      }
   }

   useEffect(() => {
      if (auth && auth.user) {
         if (post.likes.find(item => item === auth.user._id)) {
            setIsLike(true)
         }
      }
   }, [post.likes, auth])

   const handleOpenComment = (id: string) => {
      if (!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      return navigate(`/post/${id}`)
   }

   return (
      <div className='card_post'>
         <div className='avatar_post'>
            <Avatar src={post.user.avatar} size="big" />
         </div>
         <div className='card_post_content'>
            <div className="card_post_info">
               <div className="card_post_author">
                  <div className='avatar_post_mb'>
                     <Avatar src={post.user.avatar} size="big" />
                  </div>
                  <Link to={`profile/${post.user._id}`}>
                     <h3 className='card_post_author_winterId mb-0'>{post.user.winterId}</h3>
                     <h4 className='card_post_author_name mb-0'>{post.user.name}</h4>
                  </Link>
               </div>
               <div className="card_post_desc">{post.note}
                  <strong >#trend</strong>
               </div>
               <div className="card_post_music">
                  <MusicNoteRoundedIcon />
                  <strong>
                     Original song - {post.user.name}
                  </strong>
               </div>
               {
                  auth.user && auth.user._id !== post.user._id &&
                  <div className='fl-btn'>
                     <FollowBtn user={post.user} inPost={true} />
                  </div>
               }
            </div>
            <div className="card_post_video">
               <div className="card_post_video-container">
                  <CustomVideo
                     src={post.video} post={post}
                     isMute={isMute} setIsMute={setIsMute}
                     valueVolume={valueVolume} setValueVolume={setValueVolume}
                  />
               </div>
               <div className="card_post_video-actions">
                  <button className='btn' onClick={handleLikePost}>
                     <span>
                        {
                           isLike ?
                              <FavoriteIcon color='error' />
                              :
                              <FavoriteIcon />
                        }
                     </span>
                     <strong>{post.likes.length}</strong>
                  </button>
                  <div onClick={() => handleOpenComment(post._id)} style={{ textDecoration: 'none' }}>
                     <button className='btn'>
                        <span>
                           <MessageIcon />
                        </span>
                        <strong>{post.comments.length}</strong>
                     </button>
                  </div>
                  <div className='share_post'>
                     <button className='btn'>
                        <span style={{ transform: 'rotateY(180deg)' }}>
                           <ReplyIcon />
                        </span>
                     </button>
                     <ShareModal url={`${window.location.origin}/posts/${post._id}`} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardPost