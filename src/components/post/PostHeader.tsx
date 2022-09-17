import React, { useState, useEffect } from 'react'
import { IPost } from '../../utils/Typescript'
import Avatar from '../../components/global/Avatar'
import FollowBtn from '../../components/global/FollowBtn'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { likePost, unLikePost, deletePost, updatePost } from '../../redux/actions/postActions'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import { useLocation } from 'react-router-dom'
import { AUTH_MODAL } from '../../redux/types/authType'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShareModal from '../../components/global/ShareModal'

interface IProps {
   post: IPost
}

const PostHeader = ({ post }: IProps) => {
   const location = useLocation()
   const [isLike, setIsLike] = useState<boolean>(false)
   const { auth, detailPost, socket } = useSelector((state: RootStore) => state)
   const [swBtn, setSwBtn] = useState<boolean>(false)
   const [isSetting, setIsSetting] = useState<boolean>(false)
   const [roleWatcher, setRoleWatcher] = useState<string>(detailPost.roleWatcher)
   const [isComment, setIsComment] = useState<boolean>(detailPost.isComment)
   const dispatch = useDispatch<any>()
   useEffect(() => {
      if (!detailPost) return
      if (!detailPost.likes) return;
      if (detailPost.likes?.find(item => item === auth.user?._id)) {
         setIsLike(true)
      }
   }, [detailPost, auth])

   useEffect(() => {
      if(detailPost) {
         setRoleWatcher(detailPost.roleWatcher)
         setIsComment(detailPost.isComment)
      }
   }, [detailPost])

   const handleLikePost = () => {
      if (!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      if (!post) return
      if (!isLike) {
         dispatch(likePost(post, auth, socket))
         setIsLike(true)
      } else {
         setIsLike(false)
         dispatch(unLikePost(post, auth))
      }
   }

   const handleCopyLink = () => {
      if (!post) return
      const url = `${window.location.origin}${location.pathname}`
      navigator.clipboard.writeText(url)
   }

   const handleUpdatePost = () => {
      console.log(roleWatcher, isComment)
      dispatch(updatePost(roleWatcher, isComment, post._id, auth.access_token, socket))
      setIsSetting(false)
   }

   return (
      <>
         <div className="info_container">
            <div className='info_container_card'>
               <Avatar src={post.user?.avatar} size='betweenMediumAndBig' />
               <div className='card_info_user'>
                  <p className='mb-0' style={{ fontSize: '16px', fontWeight: 'bold' }}>{post.user?.winterId}</p>
                  <div className='d-flex align-items-center'>
                     <p className='mr-1 mb-0' style={{ fontSize: '14px', fontWeight: '400' }}>{post.user?.name}</p>
                     <span className='mr-1' style={{ fontSize: '14px', fontWeight: '400' }}>·</span>
                     {
                        post.createdAt &&
                        <span style={{ fontSize: '14px', fontWeight: '400' }}>{new Date(post.createdAt).getMonth()} - {new Date(post.createdAt).getDate()}</span>
                     }
                  </div>
               </div>
            </div>
            {
               (auth.user && auth.access_token) &&
                  post.user?._id !== auth.user?._id ?
                  <FollowBtn user={post.user} />
                  : 
                  auth.user?._id === post.user?._id &&
                  <div className='more' style={{ cursor: 'pointer' }}
                     onClick={() => setIsSetting(true)}
                  >
                     <MoreHorizIcon />
                  </div>
            }
         </div>
         <div className="main_container">
            <p className=''>{post.note} <strong>#trend</strong></p>
            <h5 className='d-flex align-center mt-1 mb-2' style={{ fontSize: '15px' }}>
               <MusicNoteIcon />
               <span className='ml-1 mt-2 mb-3'>Original Sound - {post.user?.name}</span>
            </h5>
            <div className='d-flex justify-content-between align-items-center w-100'>
               <div className='main_container_btn'>
                  <button className='btn p-0 mr-2'>
                     <span onClick={handleLikePost}>
                        {
                           isLike ?
                              <FavoriteIcon color='error' />
                              :
                              <FavoriteIcon />
                        }
                     </span>
                     <strong>{post.likes?.length}</strong>
                  </button>
                  <button className='btn p-0'>
                     <span>
                        <MessageIcon />
                     </span>
                     <strong>{post.comments?.length}</strong>
                  </button>
               </div>
               <div className='share_list'>
                  <ShareModal url={`${window.location.origin}/posts/${post._id}`} />
               </div>
            </div>
            <div className="show_link">
               <p className='mb-0'>{window.location.origin}/{location.pathname}</p>
               <button className='btn btn_outline'
                  onClick={handleCopyLink}
               >
                  Copy Link
               </button>
            </div>
         </div>
         {
            isSetting &&
            <div className='setting_post'>
               <div className="setting_post_box">
                  <div className='setting_post_private' style={{ borderBottom: '1px solid #ccc' }}>
                     <h2>Setting private</h2>
                     <div className="form-group">
                        <label htmlFor="roleWatcher">Who can watch this video?</label>
                        <select value={roleWatcher} className="form-control" id="roleWatcher"
                           onChange={(event) => setRoleWatcher(event.target.value)}
                        >
                           <option value={'public'}>
                              <strong className='mb-0'>Public </strong>
                              -
                              <p className='mb-0'> Everyone can watch</p>
                           </option>
                           <option value={'follower'}>
                              <strong className='mb-0'>Follower </strong>
                              -
                              <p className='mb-0'> Your followers</p>
                           </option>
                           <option value={'private'}>
                              <strong className='mb-0'>Only me </strong>
                              -
                              <p className='mb-0'> Only display with me</p>
                           </option>
                        </select>
                     </div>
                     <div className='form-group d-flex align-items-center justify-content-between mt-4 mb-3'>
                        <label htmlFor="note" className='form-label' style={{ fontWeight: '500' }}>Allows users to comment:</label>
                        <div className="switch-button position-relative">
                           <button className='sw-case' onClick={() => setIsComment(true)}>Enable</button>
                           <button className='sw-case' onClick={() => setIsComment(false)}>Disable</button>
                           <button className='switch'
                              style={{
                                 transform: isComment ? 'translateX(0px)' : 'translateX(100px)'
                              }}
                           >.</button>
                        </div>
                     </div>
                     <div className='form-group d-flex justify-content-between align-items-center mt-4'>
                        <label>Do you want to delete this post?</label>
                        <button className='btn btn-danger'
                           onClick={() => dispatch(deletePost(post._id, auth, socket))}
                        >Delete</button>
                     </div>
                     <div className='close_setting_post'
                        onClick={() => setIsSetting(false)}
                     >
                        <HighlightOffIcon />
                     </div>
                  </div>
                  <button className="btn btn-dark w-100 mt-3" onClick={handleUpdatePost}>
                     Done
                  </button>
               </div>
            </div>
         }
      </>
   )
}

export default PostHeader