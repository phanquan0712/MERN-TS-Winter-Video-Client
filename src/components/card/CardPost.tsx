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

interface IProps {
   post: IPost
}

const CardPost = ({ post }: IProps) => {
   const { auth } = useSelector((state: RootStore) => state)
   const [isLike, setIsLike] = useState<boolean>(false)
   const dispatch = useDispatch<any>()

   
   const handleLikePost = () => {
      if(!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      setIsLike(!isLike)
      if (!isLike) {
         dispatch(likePost(post, auth))
      } else {
         dispatch(unLikePost(post, auth))
      }
   }

   useEffect(() => {
      if(auth && auth.user) {
         if (post.likes.find(item => item === auth.user._id)) {
            setIsLike(true)
         }
      }
   }, [post.likes, auth])


   return (
      <div className='card_post'>
         <Avatar src={post.user.avatar} size="big" />
         <div className='card_post_content'>
            <div className="card_post_info">
               <div className="card_post_author">
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
                     <FollowBtn user={post.user} />
                  </div>
               }
            </div>
            <div className="card_post_video">
               <div className="card_post_video-container">
                     <CustomVideo src={post.video} post={post} />
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
                  <Link onClick={() => {
                     if(!auth.access_token || !auth.user) return dispatch({ type: AUTH_MODAL, payload: true })
                  }} to={(auth.access_token && auth.user) ? `post/${post._id}` : '#'} style={{ textDecoration: 'none' }}>
                     <button className='btn'>
                        <span>
                           <MessageIcon />
                        </span>
                        <strong>{post.comments.length}</strong>
                     </button>
                  </Link>
                  <button className='btn'>
                     <span style={{ transform: 'rotateY(180deg)' }}>
                        <ReplyIcon />
                     </span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardPost