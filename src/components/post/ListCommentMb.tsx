import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardCommentMb from '../card/CardCommentMb'
import { IPost, RootStore, IParams, IUser } from '../../utils/Typescript'
import InputComment from './InputComment'
import { GET_DETAIL_POST, UPDATE_LIST_POST_HP, UPDATE_LIST_POST_FL } from '../../redux/types/postType'
import { MDCM } from '../../redux/types/commentType';
import { useParams } from 'react-router-dom'
import { UPDATE_LIST_POST_PROFILE } from '../../redux/types/profileUser'


interface IProps {
   post: IPost
   active?: string
   userProfile?: IUser
}

const ListCommentMb = ({ post, active, userProfile }: IProps) => {

   const { auth, detailPost, profileUser } = useSelector((state: RootStore) => state)
   const { page, slug }: IParams = useParams()
   const dispatch = useDispatch<any>()
   const divRef = useRef<HTMLDivElement>(null);

   
   const handleCloseModalComment = () => {
      if (page === 'foryou') {
         dispatch({ type: UPDATE_LIST_POST_HP, payload: detailPost })
      } else if (page === 'following') {
         dispatch({ type: UPDATE_LIST_POST_FL, payload: detailPost })
      } else {
         if (active === 'Video') {
            if(userProfile) {
               const newUser = {
                  ...userProfile,
                  videos: userProfile.videos.map(item => item._id === detailPost._id ? detailPost : item)
               }
               dispatch({ type: UPDATE_LIST_POST_PROFILE, payload: newUser })
            }
         } else { 
            if(userProfile) {
               const newUser = {
                  ...userProfile,
                  liked: userProfile.liked.map(item => item._id === detailPost._id ? post : item)
               }
               dispatch({ type: UPDATE_LIST_POST_PROFILE, payload: newUser })
            }
         }
      }
      dispatch({ type: MDCM, payload: false })
   }
   

   const handleCloseModalWhenClickOutside = (e: any) => {
      if (e.target === divRef.current) {
         handleCloseModalComment()
      }
   }

   return (
      <>
         {
            post.isComment ?
               <div className="overlay_list_comment" ref={divRef} onClick={handleCloseModalWhenClickOutside}>
                  <div className="list_comment_mb list_comment h-100">
                     <div style={{ height: '40px' }} className='d-flex justify-content-center align-items-center position-relative'>
                        <h5 className='list_comment_mb-title'>{post.comments?.length} comments</h5>
                        <div className='list_comment_mb-close' onClick={handleCloseModalComment}>&times;</div>
                     </div>
                     <div className='list_comment_mb_content'>
                        {
                           post.comments &&
                           post.comments.map((comment) => (
                              <CardCommentMb comment={comment} />
                           ))
                        }
                     </div>
                     <InputComment post={post} />
                  </div>
               </div>
               :
               <div className="overlay_list_comment" ref={divRef}>
                  <div className="list_comment list_comment_mb h-100">
                     <p className='text-center mt-3'
                        style={{
                           fontSize: '16px', color: '#333', fontWeight: '500'
                        }}
                     >Comments have been turner off</p>
                  </div>
               </div>
         }
      </>
   )
}

export default ListCommentMb