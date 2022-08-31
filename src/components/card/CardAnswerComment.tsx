import React, { useState, useEffect } from 'react'
import { IComment } from '../../utils/Typescript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, InputChange } from '../../utils/Typescript'
import Avatar from '../global/Avatar'
import moment from 'moment'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { ANSWER_COMMENT } from '../../redux/types/commentType'
import { AUTH_MODAL } from '../../redux/types/authType'
import { deleteAnswerComment, likeComment, unLikeComment } from '../../redux/actions/commentActions'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



interface IProps {
   comment: IComment
}
const CardAnswerComment = ({ comment }: IProps) => {
   const { auth, detailPost } = useSelector((state: RootStore) => state)
   const [isLike, setIsLike] = useState<boolean>(false)
   const [isDropdown, setIsDropdown] = useState<boolean>(false)
   const [isDelete, setIsDelete] = useState<boolean>(false)
   const dispatch = useDispatch<any>()

   const handleAnswerComment = () => {
      dispatch({ type: ANSWER_COMMENT, payload: comment })
   }


   useEffect(() => {
      if (isDropdown) {
         setTimeout(() => {
            setIsDropdown(false)
         }, 3000)
         return () => {
            setIsDropdown(false)
         }
      }
   }, [isDropdown])

   useEffect(() => {
      if (!comment) return;
      if (!comment.likes) return;
      if (comment.likes?.find(item => item === auth.user?._id)) {
         setIsLike(true)
      }
   }, [comment, auth])

   const handleLikeComment = () => {
      if (!auth.access_token || !auth.user) {
         return dispatch({ type: AUTH_MODAL, payload: true })
      }
      if (!comment) return;
      if (!isLike) {
         dispatch(likeComment(comment, auth))
      } else {
         dispatch(unLikeComment(comment, auth))
      }
      setIsLike(!isLike)
   }

   const handleDeleteComment = () => {
      if (auth.access_token && auth.user) {
         setIsDelete(false)
         dispatch(deleteAnswerComment(comment, auth))
      }
   }

   return (
      <div className='card_comment answer' style={{ paddingLeft: '15px' }}>
         <Avatar src={comment.user?.avatar} size='medium' />
         <div className='d-flex align-items-start justify-content-between w-100'>
            <div className="container">
               <div className="content">
                  <p>{comment.user?.name}</p>
                  <p>{comment.content}</p>
               </div>
               <div className="sub_content">
                  <span className='mr-3'>{moment(comment.createdAt).fromNow()}</span>
                  <span onClick={handleAnswerComment}>Answer</span>
               </div>
            </div>
            <div className="actions position-relative">
               <div className='more' style={{ cursor: 'pointer' }} onClick={() => setIsDropdown(!isDropdown)}>
                  {
                     auth.user && (auth.user._id === comment.user._id || auth.user._id === detailPost.user?._id) &&
                     <MoreHorizIcon />
                  }
               </div>
               <div className='d-flex like'
                  style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'center' }}
                  onClick={handleLikeComment}
               >
                  <div>
                     {
                        isLike ? <FavoriteIcon color='error' /> : <FavoriteBorderOutlinedIcon />
                     }
                  </div>
                  <p className='mb-0'>{comment.likes?.length}</p>
               </div>
               {
                  isDropdown &&
                  <ul className='comment_dropdown'>
                     <li className='comment_dropdown-item' onClick={() => setIsDelete(true)}>
                        <DeleteOutlineOutlinedIcon />
                        <span>
                           Delete
                        </span>
                     </li>
                  </ul>
               }
               {
                  isDelete &&
                  <div className="delete_comment">
                     <div className="delete_comment_box">
                        <h2 style={{
                           fontSize: '25px',
                           justifyContent: 'center', display: 'flex',
                           fontWeight: '600', height: '100px', alignItems: 'center'
                        }} className='text-center'>Do you sure want delete this comment?</h2>
                        <button className='btn btn-outline w-100 border py-2'
                           onClick={handleDeleteComment}
                        >
                           Delete
                        </button>
                        <button
                           onClick={() => setIsDelete(false)}
                           style={{ color: '#ddd' }} className='btn btn-outline w-100 py-2'>
                           Cancel
                        </button>
                     </div>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}

export default CardAnswerComment